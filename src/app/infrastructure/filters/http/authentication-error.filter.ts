import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { HttpStatusCode } from '../../../common/http';
import { HttpErrorFilter } from './http-error.fitler';

export class AuthenticationErrorFilter implements HttpErrorFilter {
    constructor(
        private router: Router) { }

    public handle(response: HttpErrorResponse): Observable<HttpErrorResponse> {
        if (response.status === HttpStatusCode.Unauthorized) {
            this.router.navigateByUrl('/signin');

            return Observable.throw(response);
        }

        return null;
    }
}
