import { Error } from './../../common/models/error';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserLogin, AccessToken } from '../../common/models';
import { AccountService } from '../../services';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent {
    private isLoading = false;
    private errorMessage: string;
    private account: UserLogin = new UserLogin();

    constructor(
        private accountService: AccountService,
        private router: Router) {
    }

    signIn() {
        this.isLoading = true;
        this.errorMessage = '';

        this.accountService.signIn(this.account)
            .finally(() => {
                this.isLoading = false;
            })
            .subscribe(response => {
                this.router.navigateByUrl('/');
            }, errorResponse => {
                if (errorResponse.error) {
                    const error = JSON.parse(errorResponse.error);
                    this.errorMessage = error.error;
                }
            });
    }
}
