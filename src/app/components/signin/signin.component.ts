import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../../services/account.service';
import { AccessToken } from '../../common/models/token';
import { TokenProvider } from '../../infrastructure/communication/token-provider';

import { MessagingService } from '../../services/messaging.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent {
    account: any = {
        username: '',
        password: ''
    };

    isLoading: Boolean = false;
    errorMessage: string;

    constructor(
        private accountService: AccountService,
        private router: Router,
        private tokenProvider: TokenProvider,
        private messagingService: MessagingService) {
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

        this.messagingService.sendMessage(response);
        // this.tokenProvider.setAccessToken(response);

        // this.router.navigateByUrl('/');
    }

    private onError(response) {
        this.errorMessage = response.error;
        console.log(response._body);
        this.isLoading = false;
    }
}
