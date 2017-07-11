import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { TokenProvider } from '../../infrastructure/communication/token-provider';

@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(
        private router: Router,
        private tokenProvider: TokenProvider) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const accessToken = this.tokenProvider.getAccessToken();

        if (accessToken != null && state.url === '/signin') {
            this.router.navigateByUrl('/');
            return false;
        }

        if (accessToken == null && state.url === '/signin') {
            return true;
        }

        if (accessToken != null) {
            return true;
        }

        return false;
    }
}
