import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { MdSidenav } from '@angular/material';
import { CommunicationService } from './infrastructure/communication/communication.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    @ViewChild('notificationsSidenav')
    notificationsSidenav: MdSidenav;
    private isOpened: boolean;
    private subscription: Subscription;

    constructor(
        private communicationService: CommunicationService) {
        communicationService.getState()
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
    }
}
