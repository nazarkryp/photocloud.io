import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../services';
import { PageViewModel, UserViewModel } from 'app/models/view';


import { NgProgress } from 'ngx-progressbar';

@Injectable()
export class UserResolver implements Resolve<UserViewModel> {
    constructor(
        private userService: UserService,
        private progress: NgProgress) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : UserViewModel | Observable<UserViewModel> | Promise<UserViewModel> {
        this.progress.start();
        const username = route.paramMap.get('username');
        return this.userService.getUser(username)
            .catch(error => {
                this.progress.done();
                return Observable.of(error);
            });
    }
}
