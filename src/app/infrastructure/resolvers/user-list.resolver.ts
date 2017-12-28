import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserService } from 'app/services';
import { PageViewModel, UserViewModel } from 'app/models/view';

import { NgProgress } from 'ngx-progressbar';

@Injectable()
export class UserListResolver implements Resolve<PageViewModel<UserViewModel>> {
    private isLoading: boolean;
    private users: Observable<PageViewModel<UserViewModel>>;

    constructor(
        private userService: UserService,
        private progress: NgProgress) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : PageViewModel<UserViewModel> | Observable<PageViewModel<UserViewModel>> | Promise<PageViewModel<UserViewModel>> {
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
