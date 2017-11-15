import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../services';
import { Collection, User } from '../../common/models';

import { NgProgress } from 'ngx-progressbar';

@Injectable()
export class UserListResolver implements Resolve<Collection<User>> {
    constructor(
        private userService: UserService,
        private progressService: NgProgress) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : Collection<User> | Observable<Collection<User>> | Promise<Collection<User>> {
        this.progressService.start();
        return this.userService.getUsers(null)
            .do(() => this.progressService.done());
    }
}
