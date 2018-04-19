import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Page, ActivityViewModel } from 'app/models/view';
import { ActivityService, UserService } from 'app/services';
import { MatDialog } from '@angular/material';
import { ConfirmComponent } from 'app/components/shared/confirm/confirm.component';
import { RelationshipAction } from 'app/models/shared';

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
        public dialog: MatDialog,
        private userService: UserService,
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

    public removeActivity(index, activity: ActivityViewModel) {
        this.activityService.removeActivity(activity.id)
            .subscribe(() => {
                this.page.data.splice(index, 1);
            });
    }

    public removeAllActivities() {
        const dialogRef = this.dialog.open(ConfirmComponent, {
            data: {
                title: 'CLEAR ACTIVITY',
                message: 'Are you sure you want you want to clear activity?'
            }
        });

        dialogRef.afterClosed().subscribe(confirmed => {
            if (confirmed) {
                this.activityService.removeAllActivities()
                    .subscribe(() => {
                        this.page = new Page<ActivityViewModel>();
                    });
            }
        });
    }

    public accept(activity: ActivityViewModel, index) {
        this.userService.modifyRelationship(activity.user.id, { action: RelationshipAction.Approve })
            .subscribe(() => {
                activity.activityType = 0;
            });
    }

    public decline(activity: ActivityViewModel, index) {
        this.userService.modifyRelationship(activity.user.id, { action: RelationshipAction.Reject })
            .subscribe(() => {
                this.page.data.splice(index, 0);
            });
    }

    public ngOnInit() {
        this.page = new Page<ActivityViewModel>();
        this.getNotifications();
    }
}
