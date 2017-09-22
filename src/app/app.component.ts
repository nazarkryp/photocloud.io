import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MdSidenav } from '@angular/material';
import { Subscription } from 'rxjs/Rx';
import { DomSanitizer } from '@angular/platform-browser';

import { CommunicationService } from './infrastructure/communication/communication.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    @ViewChild('notificationsSidenav') notificationsSidenav: MdSidenav;
    private isOpened: boolean;
    private communicationServiceSubscription: Subscription;

    constructor(
        private communicationService: CommunicationService) {
        this.communicationServiceSubscription = communicationService.getState()
            .subscribe(isOpened => {
                this.isOpened = isOpened;
            });
    }

    openNotifications($event: boolean) {
        if ($event) {
            this.notificationsSidenav.open();
        }
    }

    public ngOnInit(): void {
    }

    public ngOnDestroy(): void {
        this.communicationServiceSubscription.unsubscribe();
    }
}
