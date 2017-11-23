import { Error } from './../../../common/models/error';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { HttpStatusCode } from 'app/common/http';
import { HttpErrorFilter } from './http-error.fitler';
import { UserProvider } from 'app/infrastructure/providers';

export class AccountNotActiveFilter implements HttpErrorFilter {
    constructor(
        private userProvider: UserProvider,
        private router: Router) { }

    public handle(response: HttpErrorResponse): ErrorObservable {
        if (response.status === HttpStatusCode.Forbidden) {
            debugger;
            let responseError;
            if (typeof response.error === 'string') {
                responseError = JSON.parse(response.error);
            } else {
                responseError = response.error;
            }

            if (responseError.error.status === 1000) {
                this.userProvider.updateCurrentUser({ isActive: false });
                this.router.navigateByUrl('/account/edit', { skipLocationChange: true });

                return Observable.throw(response);
            }
        }

        return null;
    }
}
