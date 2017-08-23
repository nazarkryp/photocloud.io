import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

import { SessionService } from '../session';
import { UserService } from '../../services/user.service';
import { CurrentUser, AccessToken } from '../../common/models';

@Injectable()
export class UserProvider {
    private $state: BehaviorSubject<CurrentUser>;

    constructor(
        private userService: UserService,
        private sessionService: SessionService) {
        const currentUser = this.getCurrentUser();
        this.$state = new BehaviorSubject<CurrentUser>(currentUser);
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
            accessToken.isPrivate,
            accessToken.isActive,
            accessToken.pictureUri
        );

        return currentUser;
    }
}
