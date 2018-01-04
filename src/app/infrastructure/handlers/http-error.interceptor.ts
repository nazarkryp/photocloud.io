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
import 'rxjs/add/operator/catch';

import { HttpErrorHandler } from 'app/infrastructure/configuration';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(
        private errorHandler: HttpErrorHandler) { }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const result = next.handle(req)
            .catch((errorResponse: HttpErrorResponse) => {
                const error = this.errorHandler.handle(errorResponse);

                if (error) {
                    return error;
                }

                return Observable.throw(errorResponse);
            });

        return result;
    }
}
