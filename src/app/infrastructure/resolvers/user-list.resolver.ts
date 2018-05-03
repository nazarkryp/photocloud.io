import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { UserService } from 'app/services';
import { Page, UserViewModel } from 'app/models/view';

@Injectable()
export class UserListResolver implements Resolve<Page<UserViewModel>> {
    constructor(
        private userService: UserService) {
    }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Page<UserViewModel>> {
        return this.userService.getUsers(null);
    }
}
