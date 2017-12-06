import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

import { AccessToken } from 'app/infrastructure/security';
import { TokenProvider } from './token-provider';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private injector: Injector) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes('/authorize')) {
            return next.handle(req);
        }

        const tokenProvider = this.injector.get(TokenProvider);

        return tokenProvider.getAccessToken()
            .mergeMap<AccessToken, HttpEvent<any>>((accessToken) => {
                if (!accessToken) {
                    return next.handle(req);
                }

                const request = req.clone({
                    setHeaders: {
                        'Authorization': `Bearer ${accessToken.accessToken}`
                    }
                });

                return next.handle(request);
            });
    }
}
