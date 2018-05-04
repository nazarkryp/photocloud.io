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
    public isLoading: boolean;
    public page: ActivityPage;
    // tslint:disable-next-line:no-output-on-prefix
    @Output() public onOpenAllNotifications: EventEmitter<void> = new EventEmitter<void>();
    // tslint:disable-next-line:no-output-on-prefix
    @Output() public onOpenRequests: EventEmitter<void> = new EventEmitter<void>();

    constructor(
        private router: Router,
        private activityService: ActivityService) { }

    public openAllNotifications(event) {
        this.onOpenAllNotifications.next();
    }

    public openRequests() {
        this.onOpenRequests.next();
    }

    public open(activity: ActivityViewModel, event) {
        // if (activity.activityType === ActivityType.AcceptedRequest || activity.activityType === ActivityType.Following) {
        //     this.router.navigate([activity.user.username]);
        // } else if (activity.activityType === ActivityType.Commented || activity.activityType === ActivityType.Liked) {
        //     this.router.navigate(['p', activity.media.id]);
        // }
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
            .subscribe(page => {
                // this.page = page;
                this.isLoading = false;
            }, error => {
                this.isLoading = false;
            });
    }

    public markAsRead() {
        if (this.page && this.page.data && this.page.data.length) {
            const ids = this.page.data.slice(0, 4).filter(e => !e.isMarkedAsRead).map(e => e.id);

            if (ids.length) {
                this.activityService.markAsRead(ids)
                    .subscribe(() => { });
            }
        }
    }

    public ngOnInit() {
        this.getNotifications();
        this.activityService.activityPage.subscribe(page => {
            this.page = page;
        });
    }
}
