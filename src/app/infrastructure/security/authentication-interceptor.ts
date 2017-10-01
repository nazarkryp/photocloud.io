import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { TokenProvider } from './token-provider';
import { AccessToken } from '../../common/models';
import { CommunicationService } from '../communication';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private injector: Injector,
        private communicationService: CommunicationService) { }

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
                        'Authorization': `Bearer ${accessToken.accessToken}`
                    }
                });

                return next.handle(request);
            });
    }
}
