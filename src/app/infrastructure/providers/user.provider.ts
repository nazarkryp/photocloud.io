import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SessionService } from 'app/infrastructure/session';
import { UserService } from 'app/services';
import { AccountService } from 'app/account/services';

import { AccessToken } from 'app/common/models/token';
import { CurrentUser } from 'app/common/models/current-user';

@Injectable()
export class UserProvider {
    private $state: BehaviorSubject<CurrentUser>;

    constructor(
        private accountService: AccountService,
        private userService: UserService,
        private sessionService: SessionService) {
        const currentUser = this.getCurrentUser();
        this.$state = new BehaviorSubject<CurrentUser>(currentUser);
    }

    public refreshCurrentUser() {
        this.accountService.getAccount()
            .subscribe(accountSettings => {

            });
    }

    public getCurrentUser() {
        const accessToken = this.sessionService.getSession();

        if (!accessToken) {
            return null;
        }

        const currentUser = this.mapToCurrentUser(accessToken);

        return currentUser;
    }

    public getCurrentUserAsObservable() {
        return this.$state.asObservable();
    }

    public setCurrentUser(accessToken: AccessToken) {
        if (accessToken) {
            this.sessionService.setSession(accessToken);
            const currentUser = this.mapToCurrentUser(accessToken);

            this.$state.next(currentUser);
        }
    }

    public updateCurrentUser(propertiesToUpdate: any) {
        const properties = Object.getOwnPropertyNames(propertiesToUpdate);

        this.sessionService.updateSession(propertiesToUpdate);
        const currentUser = this.getCurrentUser();
        this.$state.next(currentUser);
    }

    private mapToCurrentUser(accessToken: AccessToken): CurrentUser {
        const currentUser: CurrentUser = new CurrentUser(
            accessToken.userId,
            accessToken.username,
            '',
            '',
            '',
            accessToken.isPrivate,
            accessToken.isActive,
            accessToken.pictureUri
        );

        return currentUser;
    }
}
