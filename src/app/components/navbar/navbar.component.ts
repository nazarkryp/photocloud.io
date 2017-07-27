import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router, NavigationEnd } from '@angular/router';

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
    private renderToolbar: boolean;

    constructor(
        private communicationService: CommunicationService,
        private accountService: AccountService,
        private router: Router) {
    }

    ngOnInit(): void {
        this.subscription = this.communicationService
            .getState()
            .subscribe(accessToken => {
                this.accessToken = accessToken;
            });
        this.router.events.subscribe((event: any): void => {
            this.navigationInterceptor(event);
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private navigationInterceptor(event): void {
        if (event instanceof NavigationEnd) {
            this.renderToolbar = this.router.url !== '/signin' && this.router.url !== '/account/create';
        }
    }
}
