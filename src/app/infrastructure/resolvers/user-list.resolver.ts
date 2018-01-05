import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { UserService } from 'app/services';
import { PageViewModel, UserViewModel } from 'app/models/view';

@Injectable()
export class UserListResolver implements Resolve<PageViewModel<UserViewModel>> {
    constructor(
        private userService: UserService) {
    }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : PageViewModel<UserViewModel> | Observable<PageViewModel<UserViewModel>> | Promise<PageViewModel<UserViewModel>> {
        return this.userService.getUsers(null);
    }
}
