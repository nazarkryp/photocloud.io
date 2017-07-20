import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../security/token.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(
        private router: Router,
        private tokenService: TokenService) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const accessToken = await this.tokenService.getAccessToken();

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

        this.router.navigateByUrl('/signin');

        return false;
    }
}
