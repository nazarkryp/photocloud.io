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

    public close(event) {
        this.onOpenAllNotifications.next();
    }

    public getNotifications() {
        this.isLoading = true;
        this.activityService.getRecentActivity(this.page.pagination)
            .finally(() => {
                this.isLoading = false;
            })
            .subscribe(page => {
                if (!this.page.pagination) {
                    this.page = new Page<ActivityViewModel>();
                }

                this.page.hasMoreItems = page.hasMoreItems;
                this.page.pagination = page.pagination;
                if (page.data) {
                    this.page.data = this.page.data.concat(page.data);
                }
            });
    }

    public ngOnInit() {
        this.page = new Page<ActivityViewModel>();
        this.getNotifications();
    }
}
