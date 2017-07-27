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
    private isLoading = false;
    private errors: string;
    private account: IncommingUser = new IncommingUser();

    constructor(
        private accountService: AccountService,
        private router: Router) {
    }

    signUp() {
        this.isLoading = true;
        this.errors = '';

        this.accountService.signUp(this.account)
            .finally(() => {
                this.isLoading = false;
            })
            .subscribe(response => {
                this.router.navigateByUrl('/signin');
            }, error => {
                this.errors = error.error.error.modelState;
            });
    }
}
