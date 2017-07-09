import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../../services/account.service';
import { AccessToken } from '../../common/models/token';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent {
    account: any = {
        username: 'nazarkryp',
        password: 'Nk@809863'
    };

    isLoading: Boolean = false;
    errorMessage: string;

    constructor(private accountService: AccountService, private router: Router) {
    }

    signIn() {
        this.isLoading = true;
        this.errorMessage = '';

        this.accountService.signIn(this.account)
            .then(
            (response) => this.onSuccess(response),
            (error) => this.onError(error));
    }

    private onSuccess(response) {
        this.isLoading = false;

        this.router.navigateByUrl('/');
    }

    private onError(response) {
        this.errorMessage = response.error;
        console.log(response._body);
        this.isLoading = false;
    }
}
