import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ActivityService } from 'app/services';
import { ActivityViewModel, Page } from 'app/models/view';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
    public isLoading: boolean;
    public page: Page<ActivityViewModel>;
    @Output() public onOpenAllNotifications: EventEmitter<void> = new EventEmitter<void>();
    @Output() public onOpenRequests: EventEmitter<void> = new EventEmitter<void>();

    constructor(
        private activityService: ActivityService) { }

    public get title(): string {
        return this.page ? 'Notifications' : (this.isLoading ? 'Loading notifications' : 'You have no notifications');
    }

    public openAllNotifications(event) {
        this.onOpenAllNotifications.next();
    }

    public openRequests() {
        this.onOpenRequests.next();
    }

    public getNotifications() {
        this.isLoading = true;
        this.activityService.getRecentActivity()
            .finally(() => {
                this.isLoading = false;
            })
            .subscribe(page => {
                this.page = page;
            });
    }

    public ngOnInit() {
        this.getNotifications();
    }
}
