import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Rx';
import { ErrorObservable } from 'rxjs/Observable/ErrorObservable';

@Injectable()
export class NotFoundInterceptor implements HttpInterceptor {
    constructor(
        private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .catch((error) => {
                if (error.status === 404) {
                    this.router.navigateByUrl('/404', { skipLocationChange: true });

                    return Observable.throw(error);
                }

                return Observable.of(error);
            });
    }
}
