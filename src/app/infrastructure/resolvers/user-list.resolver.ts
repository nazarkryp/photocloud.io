import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../services';
import { Page, User } from '../../common/models';

import { NgProgress } from 'ngx-progressbar';

@Injectable()
export class UserListResolver implements Resolve<Page<User>> {
    private isLoading: boolean;
    private users: Observable<Page<User>>;

    constructor(
        private userService: UserService,
        private progress: NgProgress) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : Page<User> | Observable<Page<User>> | Promise<Page<User>> {
        if (this.isLoading && this.users) {
            return this.users;
        }

        this.progress.start();

        const users = this.userService.getUsers(null)
            .do(() => {
                this.progress.done();
                this.isLoading = false;
            });

        return users;
    }
}
