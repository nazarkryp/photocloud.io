
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { HttpStatusCode } from 'app/models/common/http';
import { HttpErrorFilter } from './http-error.fitler';

export class HttpNotFoundFilter implements HttpErrorFilter {
    constructor(
        private router: Router) { }

    public handle(response: HttpErrorResponse): Observable<any> {
        if (response.status === HttpStatusCode.NotFount) {
            this.router.navigateByUrl('/404', { skipLocationChange: true });

            return observableThrowError(response);
        }

        return null;
    }
}
