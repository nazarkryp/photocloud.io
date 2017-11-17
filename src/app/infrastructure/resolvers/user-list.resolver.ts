import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../services';
import { Collection, User } from '../../common/models';

import { NgProgress } from 'ngx-progressbar';

@Injectable()
export class UserListResolver implements Resolve<Collection<User>> {
    private isLoading: boolean;
    private users: Observable<Collection<User>>;

    constructor(
        private userService: UserService,
        private progressService: NgProgress) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : Collection<User> | Observable<Collection<User>> | Promise<Collection<User>> {
        if (this.isLoading && this.users) {
            return this.users;
        }

        this.progressService.start();

        const users = this.userService.getUsers(null)
            .do(() => {
                this.progressService.done();
                this.isLoading = false;
            });

        return users;
    }
}
