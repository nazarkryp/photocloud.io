import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { HttpStatusCode } from 'app/models/common/http';
import { HttpErrorFilter } from './http-error.fitler';
import { CurrentUserService } from 'app/infrastructure/services';

export class AccountNotActiveFilter implements HttpErrorFilter {
    constructor(
        private currentUserService: CurrentUserService,
        private router: Router) { }

    public handle(response: HttpErrorResponse): Observable<any> {
        if (response.status === HttpStatusCode.Forbidden) {
            let responseError;
            if (typeof response.error === 'string') {
                responseError = JSON.parse(response.error);
            } else {
                responseError = response.error;
            }

            if (responseError.error.status === 1000) {
                this.currentUserService.updateCurrentUser({ isActive: false });
                this.router.navigateByUrl('/account/edit', { skipLocationChange: true });

                return Observable.throw(response);
            }
        }

        return null;
    }
}
