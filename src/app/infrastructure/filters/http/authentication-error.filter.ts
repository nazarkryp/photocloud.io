import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Observable';

import { HttpStatusCode } from 'app/models/common/http';
import { HttpErrorFilter } from './http-error.fitler';
import { CurrentUserService } from 'app/infrastructure/services';

export class AuthenticationErrorFilter implements HttpErrorFilter {
    constructor(
        private router: Router,
        private currentUserService: CurrentUserService) { }

    public handle(response: HttpErrorResponse): ErrorObservable | Observable<HttpErrorResponse> {
        if (response.status === HttpStatusCode.Unauthorized) {
            this.currentUserService.signOut();
            this.router.navigateByUrl('/account/signin');
            return Observable.throw(response);
        }

        return null;
    }
}
