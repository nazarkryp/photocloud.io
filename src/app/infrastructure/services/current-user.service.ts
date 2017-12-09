import { Injectable } from '@angular/core';

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

import { CurrentUser } from 'app/common/models';
import { UserService } from 'app/services';
import { AccountService } from 'app/account/services';
import { LocalStorageService } from 'app/infrastructure/services/storage';
import { TokenProvider } from 'app/infrastructure/security';
import { AccessToken } from 'app/infrastructure/security/access-token.model';

@Injectable()
export class CurrentUserService {
    private currentUserStorageKey = 'photocloud-current-user';
    private state: ReplaySubject<CurrentUser> = new ReplaySubject<CurrentUser>(1);

    constructor(
        private tokenProvider: TokenProvider,
        private storageService: LocalStorageService,
        private userService: UserService,
        private accountService: AccountService) {
        const currentUser = this.retrieveCurrentUser();
        this.state.next(currentUser);
    }

    public getCurrentUser(refresh: boolean = false): Observable<CurrentUser> {
        if (refresh) {
            const currentUser = this.retrieveCurrentUser();

            if (currentUser) {
                return this.accountService.getAccount()
                    .mergeMap<CurrentUser, CurrentUser>(serverCurrentUser => {
                        this.saveCurrentUser(serverCurrentUser);

                        this.state.next(serverCurrentUser)
                        return this.state.asObservable();
                    });
            }
        }

        return this.state.asObservable();
    }

    public signIn(username: string, password: string): Observable<any> {
        return this.accountService.signIn(username, password)
            .mergeMap<AccessToken, CurrentUser>(accessToken => {
                this.tokenProvider.setAccessToken(accessToken);
                return this.accountService.getAccount()
                    .map(currentUser => {
                        this.saveCurrentUser(currentUser);
                        return currentUser;
                    });
            })
    }

    public signOut() {
        this.storageService.clear();
    }

    public updateCurrentUser(propertiesToUpdate: any): Observable<CurrentUser> {
        return this.accountService.updateAccount(propertiesToUpdate)
            .do(currentUser => {
                this.saveCurrentUser(currentUser);
            });
    }

    public retrieveCurrentUser(): CurrentUser {
        return this.storageService.get<CurrentUser>(this.currentUserStorageKey, CurrentUser);
    }

    private saveCurrentUser(currentUser: CurrentUser) {
        this.state.next(currentUser);
        this.storageService.set<CurrentUser>(this.currentUserStorageKey, currentUser);
    }
}
