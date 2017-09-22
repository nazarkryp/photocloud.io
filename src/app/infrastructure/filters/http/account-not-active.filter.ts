import { Error } from './../../../common/models/error';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { HttpStatusCode } from '../../../common/http';
import { HttpErrorFilter } from './http-error.fitler';
import { UserProvider } from '../../providers';

export class AccountNotActiveFilter implements HttpErrorFilter {
    constructor(
        private userProvider: UserProvider,
        private router: Router) { }

    public handle(response: HttpErrorResponse): Observable<HttpErrorResponse> {
        console.log('AccountNotActiveFilter');
        if (response.status === HttpStatusCode.Forbidden) {
            const responseError = JSON.parse(response.error);

            if (responseError.error.status === 1000) {
                this.userProvider.updateCurrentUser({ isActive: false });
                this.router.navigateByUrl('/account/edit', { skipLocationChange: true });

                return Observable.throw(response);
            }
        }

        return null;
    }
}
