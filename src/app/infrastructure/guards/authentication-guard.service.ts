import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import 'rxjs/add/operator/map';

import { TokenProvider } from 'app/infrastructure/security';

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(
        private router: Router,
        private tokenProvider: TokenProvider) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.tokenProvider.getAccessToken()
            .map(accessToken => {
                if (accessToken != null && (state.url === '/account/signin' || state.url === '/account/create')) {
                    this.router.navigateByUrl('/');
                    return false;
                }

                if (accessToken == null && (state.url === '/account/signin' || state.url === '/account/create')) {
                    return true;
                }

                if (accessToken != null && !accessToken.isActive && (state.url !== '/account/edit')) {
                    this.router.navigateByUrl('/account/edit');
                    return false;
                }

                if (accessToken != null) {
                    return true;
                }

                this.router.navigateByUrl('/account/signin');

                return false;
            });
    }
}
