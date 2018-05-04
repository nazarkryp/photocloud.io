import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Page, ActivityViewModel } from 'app/models/view';
import { ActivityService, UserService } from 'app/services';
import { MatDialog } from '@angular/material';
import { ConfirmComponent } from 'app/components/shared/confirm/confirm.component';
import { RelationshipAction } from 'app/models/shared';
import { trigger, transition, style, stagger, query, keyframes, animate } from '@angular/animations';
import { finalize } from 'rxjs/operators';

@Component({
    templateUrl: './activity.component.html',
    styleUrls: ['./activity.component.css'],
    animations: [
        trigger('listAnimation', [
            transition('* => *', [
                // query(':enter', style({ opacity: 0 }), { optional: true }),
                // query(':enter', stagger('.1s', [
                //     animate('1s ease-in', keyframes([
                //         style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
                //         style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
                //         style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
                //     ]))]), { optional: true }),
                query(':leave', stagger('.1s', [
                    animate('1s ease-in', keyframes([
                        style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
                        style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
                        style({ opacity: 0, transform: 'translateY(-75%)', offset: 1.0 }),
                    ]))]), { optional: true })
            ])
        ])
    ]
})
export class ActivityComponent implements OnInit {
    public isLoading: boolean;
    public page: Page<ActivityViewModel>;
    // tslint:disable-next-line:no-output-on-prefix
    @Output() public onOpenAllNotifications: EventEmitter<void> = new EventEmitter<void>();

    constructor(
        public dialog: MatDialog,
        private userService: UserService,
        private activityService: ActivityService) { }

    public close(event) {
        this.onOpenAllNotifications.next();
    }

    public getNotifications(showProgress: boolean = true) {
        this.isLoading = true;

        // if (showProgress) {
        //     this.progress.start();
        // }

        this.activityService.getRecentActivity(this.page.pagination)
            .pipe(finalize(() => {
                this.isLoading = false;
            }))
            .subscribe(page => {
                this.page = page;
                // if (!this.page) {
                //     this.page = new Page<ActivityViewModel>();
                // }

                // this.page.hasMoreItems = page.hasMoreItems;
                // this.page.pagination = page.pagination;
                // if (page.data) {
                //     this.page.data = this.page.data.concat(page.data);
                // }
            });
    }

    public onPositionChange() {
        if (!this.isLoading && this.page && this.page.hasMoreItems) {
            this.getNotifications();
        }
    }

    public removeActivity(index, activity: ActivityViewModel) {
        // this.page.data.pop();
        this.page.data.splice(index, 1);
        // this.activityService.removeActivity(activity.id)
        //     .subscribe(() => {
        //         this.page.data.splice(index, 1);
        //     });
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
