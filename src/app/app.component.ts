import { Component, ViewChild } from '@angular/core';

import { MdSidenav } from '@angular/material';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    @ViewChild('notificationsSidenav')
    notificationsSidenav: MdSidenav;

    openNotification($event: boolean) {
        if ($event) {
            this.notificationsSidenav.open();
        }
    }

    notificationsClosed($event) {
        console.log($event);
    }
}
