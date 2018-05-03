import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { HttpStatusCode } from 'app/models/common/http';
import { HttpErrorFilter } from './http-error.fitler';

export class InternetConnectionFilter implements HttpErrorFilter {
    constructor(
        private router: Router) { }

    public handle(response: HttpErrorResponse): Observable<any> {
        if (response.status === HttpStatusCode.None) {
            this.router.navigateByUrl('/offline', { skipLocationChange: true });

            return Observable.throw(response);
        }

        return null;
    }
}
