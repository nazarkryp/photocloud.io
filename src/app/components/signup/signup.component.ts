import { Error } from './../../common/models/error';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { IncommingUser, AccessToken } from '../../common/models';
import { AccountService } from '../../services';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent {
    public isLoading = false;
    public errors: string;
    public account: IncommingUser = new IncommingUser();

    constructor(
        private accountService: AccountService,
        private router: Router) {
    }

    public signUp() {
        this.isLoading = true;
        this.errors = '';

        this.accountService.signUp(this.account)
            .finally(() => {
                this.isLoading = false;
            })
            .subscribe(response => {
                this.router.navigateByUrl('/signin');
            }, errorResponse => {
                if (errorResponse.error) {
                    const error = JSON.parse(errorResponse.error);
                    this.errors = error.error.modelState;
                    console.log(this.errors);
                }
            });
    }
}
