import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Observable';

import { HttpStatusCode } from 'app/common/http';
import { HttpErrorFilter } from './http-error.fitler';

export class AuthenticationErrorFilter implements HttpErrorFilter {
    constructor(
        private router: Router) { }

    public handle(response: HttpErrorResponse): ErrorObservable {
        if (response.status === HttpStatusCode.Unauthorized) {
            console.log('if (response.status === HttpStatusCode.Unauthorized) {');
            this.router.navigateByUrl('/account/signin');

            return Observable.throw(response);
        }

        return null;
    }
}
