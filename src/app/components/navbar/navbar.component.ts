import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import { AccountService } from '../../services/account.service';
import { AccessToken } from '../../common/models/token';
import { CommunicationService } from '../../infrastructure/communication/communication.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    private accessToken: AccessToken;

    constructor(
        private communicationService: CommunicationService,
        private accountService: AccountService,
        private router: Router) {
    }

    logout() {
        this.accountService.signOut();
        this.router.navigateByUrl('/signin');
    }

    ngOnInit(): void {
        this.communicationService
            .getState()
            .subscribe(accessToken => {
                this.accessToken = accessToken;
            });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
