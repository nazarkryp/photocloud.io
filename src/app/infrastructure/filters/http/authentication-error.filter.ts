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
            if (this.currentUserService.canSignInWithCode) {
                this.router.navigateByUrl('/account/restore');
            } else {
                const currentUser = this.currentUserService.retrieveCurrentUser();
                const clearUserData = !currentUser.isRemembered;
                this.currentUserService.signOut(clearUserData);
                this.router.navigateByUrl('/account/signin');
            }

            return Observable.throw(response);
        }

        return null;
    }
}
