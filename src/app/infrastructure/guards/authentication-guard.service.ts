﻿import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { TokenProvider } from 'app/infrastructure/security';
import { CurrentUserService } from 'app/infrastructure/services';

@Injectable()
export class AuthenticationGuardService implements CanActivate {
    constructor(
        private router: Router,
        private currentUserService: CurrentUserService) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.currentUserService.retrieveCurrentUser()

        if (currentUser != null && (state.url === '/account/signin' || state.url === '/account/create')) {
            this.router.navigateByUrl('/');
            return false;
        }

        if (currentUser == null && (state.url === '/account/signin' || state.url === '/account/create')) {
            return true;
        }

        if (currentUser != null && !currentUser.isActive && (state.url !== '/account/edit')) {
            this.router.navigateByUrl('/account/edit');
            return false;
        }

        if (currentUser != null) {
            return true;
        }

        this.router.navigateByUrl('/account/signin');

        return false;
    }
}
