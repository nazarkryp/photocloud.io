import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse,
    HttpSentEvent,
    HttpHeaderResponse,
    HttpProgressEvent,
    HttpUserEvent
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { HttpErrorHandler } from 'app/infrastructure/configuration';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(
        private errorHandler: HttpErrorHandler) { }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const result: any = next.handle(req)
            .pipe(catchError((errorResponse: HttpErrorResponse) => {
                const error = this.errorHandler.handle(errorResponse);

                if (error) {
                    return error;
                }

                return Observable.throw(errorResponse);
            }));

        return result;
    }
}
