import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import { HttpConfiguration } from 'app/infrastructure/configuration';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(
        private config: HttpConfiguration) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .catch((errorResponse: HttpErrorResponse) => {
                for (const filter of this.config.filters) {
                    const error = filter.handle(errorResponse);

                    if (error) {
                        return error;
                    }
                }

                return Observable.throw(errorResponse);
            });
    }
}
