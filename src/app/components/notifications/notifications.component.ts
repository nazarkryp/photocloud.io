import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ActivityService } from 'app/services';
import { ActivityViewModel, Page } from 'app/models/view';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
    public isLoading: boolean;
    public page: Page<ActivityViewModel>;
    // tslint:disable-next-line:no-output-on-prefix
    @Output() public onOpenAllNotifications: EventEmitter<void> = new EventEmitter<void>();
    // tslint:disable-next-line:no-output-on-prefix
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
            .pipe(finalize(() => {
                this.isLoading = false;
            }))
            .subscribe(page => {
                this.page = page;
            });
    }

    public ngOnInit() {
        this.getNotifications();
    }
}
