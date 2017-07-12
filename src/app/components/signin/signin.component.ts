import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../../services/account.service';
import { AccessToken } from '../../common/models/token';

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
        private messagingService: MessagingService) {
    }

    async signIn() {
        this.isLoading = true;
        this.errorMessage = '';

        try {
            const accessToken = await this.accountService.signIn(this.account);
            this.router.navigateByUrl('/');
        } catch (error) {
            this.errorMessage = error.error;
        } finally {
            this.isLoading = false;
        }
    }
}
