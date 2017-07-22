import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { TokenProvider } from './token-provider';
import { AccessToken } from '../../common/models';

import { environment } from '../../../environments/environment';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    constructor(
        private injector: Injector) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes('/authorize')) {
            return next.handle(req);
        }

        const tokenProvider = this.injector.get(TokenProvider);

        return tokenProvider.getAccessToken()
            .flatMap<AccessToken, HttpEvent<any>>((accessToken) => {
                if (!accessToken) {
                    return next.handle(req);
                }

                const request = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${accessToken.accessToken}`
                    }
                });

                return next.handle(request);
            });
    }
}
