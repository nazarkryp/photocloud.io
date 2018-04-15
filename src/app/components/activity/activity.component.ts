import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Page, ActivityViewModel } from 'app/models/view';
import { ActivityService } from 'app/services';

@Component({
    selector: 'app-activity',
    templateUrl: './activity.component.html',
    styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
    public isLoading: boolean;
    public page: Page<ActivityViewModel>;
    @Output() public onOpenAllNotifications: EventEmitter<void> = new EventEmitter<void>();

    constructor(
        private activityService: ActivityService) { }

    public get title(): string {
        return this.page ? 'Notifications' : (this.isLoading ? 'Loading notifications' : 'You have no notifications');
    }

    public close(event) {
        this.onOpenAllNotifications.next();
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
