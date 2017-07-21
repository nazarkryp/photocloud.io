import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { TokenService } from '../security/token.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    constructor(
        private tokenService: TokenService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.tokenService.getAccessToken();
        return next.handle(req);
    }
}
