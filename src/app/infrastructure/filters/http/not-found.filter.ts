import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Observable';

import { HttpStatusCode } from 'app/models/common/http';
import { HttpErrorFilter } from './http-error.fitler';

export class HttpNotFoundFilter implements HttpErrorFilter {
    constructor(
        private router: Router) { }

    public handle(response: HttpErrorResponse): ErrorObservable {
        if (response.status === HttpStatusCode.NotFount) {
            this.router.navigateByUrl('/404', { skipLocationChange: true });

            return Observable.throw(response);
        }

        return null;
    }
}
