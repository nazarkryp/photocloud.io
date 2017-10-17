import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material';

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
    private myErrorStateMatcher: MyErrorStateMatcher;

    constructor(
        private accountService: AccountService,
        private router: Router) {
        this.myErrorStateMatcher = new MyErrorStateMatcher();
    }

    signIn() {
        console.log('SUBMIT');
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

class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl, form: FormGroupDirective | NgForm): boolean {
        const isSubmitted = form && form.submitted;
        return isSubmitted && (!!(control.invalid && (control.dirty || control.touched)));
    }
}
