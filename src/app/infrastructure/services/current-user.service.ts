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
    private currentUser: CurrentUser;
    private state: ReplaySubject<CurrentUser> = new ReplaySubject<CurrentUser>();

    constructor(
        private tokenProvider: TokenProvider,
        private storageService: LocalStorageService,
        private userService: UserService,
        private accountService: AccountService) { }

    public getCurrentUser(refresh: boolean = false)
        : Observable<CurrentUser> {
        this.currentUser = this.retrieveCurrentUser();
        if (!refresh) {
            this.state.next(this.currentUser);
            return this.state.asObservable();
        }

        return this.getAccount()
            .mergeMap<CurrentUser, CurrentUser>(currentUser => {
                return this.state.asObservable();
            });
    }

    public signIn(username: string, password: string): Observable<any> {
        return this.accountService.signIn(username, password)
            .do(accessToken => {
                this.tokenProvider.setAccessToken(accessToken);
            }).flatMap<AccessToken, CurrentUser>(accessToken => {
                return this.getAccount();
            });
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

    private saveCurrentUser(currentUser: CurrentUser) {
        this.state.next(currentUser);
        this.storageService.set<CurrentUser>(this.currentUserStorageKey, currentUser);
    }

    private retrieveCurrentUser(): CurrentUser {
        return this.storageService.get<CurrentUser>(this.currentUserStorageKey, CurrentUser);
    }

    private getAccount(): Observable<CurrentUser> {
        return this.accountService.getAccount()
            .do(currentUser => {
                this.currentUser = currentUser;
                this.saveCurrentUser(currentUser);
            });
    }
}
