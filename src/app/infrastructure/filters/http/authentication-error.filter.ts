
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { HttpStatusCode } from 'app/models/common/http';
import { HttpErrorFilter } from './http-error.fitler';
import { CurrentUserService } from 'app/infrastructure/services';

export class AuthenticationErrorFilter implements HttpErrorFilter {
    constructor(
        private router: Router,
        private currentUserService: CurrentUserService) { }

    public handle(response: HttpErrorResponse): Observable<HttpErrorResponse> {
        if (response.status === HttpStatusCode.Unauthorized) {
            if (this.currentUserService.canSignInWithCode) {
                this.router.navigateByUrl('/account/restore');
            } else {
                const currentUser = this.currentUserService.retrieveCurrentUser();
                const clearUserData = currentUser && !currentUser.isRemembered;
                this.currentUserService.signOut(clearUserData);
                this.router.navigateByUrl('/account/signin');
            }

            return observableThrowError(response);
        }

        return null;
    }
}
