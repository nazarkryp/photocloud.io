import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { MessagingService } from '../../services/messaging.service';

import { AccessToken } from '../../common/models/token';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    accessToken: AccessToken;

    constructor(
        private messageService: MessagingService,
        private router: Router) {
        this.subscription = this.messageService
            .getMessage()
            .subscribe(accessToken => {
                this.accessToken = accessToken;
            });
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/signin');
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        // this.subscription.unsubscribe();
    }
}
