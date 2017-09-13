import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MdSidenav, MdIconRegistry } from '@angular/material';
import { Subscription } from 'rxjs/Rx';
import { DomSanitizer } from '@angular/platform-browser';

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
    private text: string;

    constructor(
        // private mdIconRegistry: MdIconRegistry,
        // private sanitizer: DomSanitizer,
        private communicationService: CommunicationService) {
        // mdIconRegistry.addSvgIcon('heart', sanitizer.bypassSecurityTrustResourceUrl('assets/svg/icons/heart.svg'));
        this.text = 'sex';
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
