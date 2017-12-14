import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../services';
import { Page, User } from '../../common/models';

import { NgProgress } from 'ngx-progressbar';

@Injectable()
export class UserResolver implements Resolve<User> {
    constructor(
        private userService: UserService,
        private progress: NgProgress) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : User | Observable<User> | Promise<User> {
        this.progress.start();
        const username = route.paramMap.get('username');
        return this.userService.getUser(username)
            .catch(error => {
                this.progress.done();
                return Observable.of(error);
            });
    }
}
