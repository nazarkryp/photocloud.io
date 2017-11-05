import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSidenav } from '@angular/material';

import { CommunicationService } from './infrastructure/communication/communication.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    @ViewChild('notificationsSidenav')
    public notificationsSidenav: MatSidenav;

    public openNotifications($event: boolean) {
        this.notificationsSidenav.open();
    }

    public closeNotifications($event: any) {
        this.notificationsSidenav.close();
    }
}
