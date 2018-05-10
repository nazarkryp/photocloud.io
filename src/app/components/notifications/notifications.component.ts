import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';

import { finalize } from 'rxjs/operators';

import { ActivityService } from 'app/services';
import { ActivityViewModel, Page, ActivityPage } from 'app/models/view';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.css'],
    animations: [
        trigger(
            'showLoaderTransition', [
                transition(':enter', [
                    style({ height: '0px', opacity: 0 }),
                    animate('150ms', style({ height: '50px', opacity: 1 }))
                ]),
                transition(':leave', [
                    style({ height: '50px', opacity: 1 }),
                    animate('150ms', style({ height: '0px', opacity: 0 }))
                ])
            ]
        )
    ]
})
export class NotificationsComponent implements OnInit {
    @Output()
    public allNotificatoinsOpened: EventEmitter<void> = new EventEmitter<void>();
    @Output()
    public requestsOpened: EventEmitter<void> = new EventEmitter<void>();

    public isLoading: boolean;
    public activity: ActivityPage;

    constructor(
        private router: Router,
        private activityService: ActivityService) { }

    public openAllNotifications(event) {
        this.allNotificatoinsOpened.next();
    }

    public openRequests() {
        this.requestsOpened.next();
    }

    public getNotifications() {
        if (this.isLoading) {
            return;
        }

        this.isLoading = true;
        this.activityService.getRecentActivity()
            .pipe(finalize(() => {
                this.isLoading = false;
            }))
            .subscribe(() => {
                this.isLoading = false;
            }, error => {
                this.isLoading = false;
            });
    }

    public markAsRead() {
        if (this.activity && this.activity.data && this.activity.data.length) {
            const ids = this.activity.data.slice(0, 4).filter(e => !e.isMarkedAsRead).map(e => e.id);

            if (ids.length) {
                this.activityService.markAsRead(ids)
                    .subscribe(() => { });
            }
        }
    }

    public ngOnInit() {
        this.activityService.activity.subscribe(activity => {
            this.activity = activity;
        });
    }
}
