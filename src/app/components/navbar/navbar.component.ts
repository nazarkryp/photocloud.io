import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { TokenProvider } from '../../infrastructure/communication/token-provider';
import { MessagingService } from '../../services/messaging.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
    message: any;
    subscription: Subscription;

    constructor(private messageService: MessagingService) {
        this.subscription = this.messageService
            .getMessage()
            .subscribe(message => {
                this.message = message;
                console.log(this.message);
            });
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
