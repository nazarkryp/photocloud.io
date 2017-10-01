import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { HttpStatusCode } from '../../../common/http';
import { HttpErrorFilter } from './http-error.fitler';

export class InternetConnectionFilter implements HttpErrorFilter {
    constructor(
        private router: Router) { }

    public handle(response: HttpErrorResponse): Observable<HttpErrorResponse> {
        if (response.status === HttpStatusCode.None) {
            this.router.navigateByUrl('/nointernetconnection', { skipLocationChange: true });

            return Observable.throw(response);
        }

        return null;
    }
}
