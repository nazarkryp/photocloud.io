import { Injectable } from '@angular/core';

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

import { CurrentUser } from 'app/common/models';
import { UserService } from 'app/services';
import { AccountService } from 'app/account/services';
import { LocalStorageService } from 'app/infrastructure/services/storage';

@Injectable()
export class CurrentUserService {
    private currentUserStorageKey = 'photocloud-current-user';
    private currentUser: CurrentUser;
    private state: ReplaySubject<CurrentUser> = new ReplaySubject<CurrentUser>();

    constructor(
        private storageService: LocalStorageService,
        private userService: UserService,
        private accountService: AccountService) { }

    public getCurrentUser(refresh: boolean = false)
        : Observable<CurrentUser> {
        this.currentUser = this.retrieveCurrentUser();

        if (this.currentUser && !refresh) {
            return this.state.asObservable();
        }

        return this.accountService.getAccount()
            .mergeMap<CurrentUser, CurrentUser>(currentUser => {
                this.currentUser = currentUser;
                this.saveCurrentUser(currentUser);
                this.state.next(currentUser);
                return this.state.asObservable();
            });
    }

    public updateCurrentUser(propertiesToUpdate: any): Observable<CurrentUser> {
        this.accountService.updateAccount(propertiesToUpdate);
    }

    private saveCurrentUser(currentUser: CurrentUser) {
        this.storageService.set<CurrentUser>(this.currentUserStorageKey, currentUser);
    }

    private retrieveCurrentUser(): CurrentUser {
        return this.storageService.get<CurrentUser>(this.currentUserStorageKey, CurrentUser);
    }
}
