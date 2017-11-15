import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../services';
import { Collection, User } from '../../common/models';

import { NgProgress } from 'ngx-progressbar';

@Injectable()
export class UserResolver implements Resolve<User> {
    constructor(
        private userService: UserService,
        private progressService: NgProgress) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : User | Observable<User> | Promise<User> {
        this.progressService.start();
        const username = route.paramMap.get('username');
        return this.userService.getUser(username);
    }
}
