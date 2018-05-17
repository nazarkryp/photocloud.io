import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { trigger, transition, style, stagger, query, keyframes, animate, sequence } from '@angular/animations';
import { MatDialog } from '@angular/material';

import { of, Subject } from 'rxjs';
import { finalize, delay, debounceTime } from 'rxjs/operators';

import { Page, ActivityViewModel } from 'app/models/view';
import { UserService } from 'app/services';
import { ActivityService } from 'app/services/activity';
import { ConfirmComponent } from 'app/components/shared/confirm/confirm.component';
import { RelationshipAction } from 'app/models/shared';

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
                query(':leave', stagger('1s', [
                    animate('.5s ease-out', keyframes([
                        style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
                        style({ opacity: .5, transform: 'translateX(35px)', offset: 0.3 }),
                        style({ opacity: 0, transform: 'translateX(-200px)', offset: 1.0 }),
                    ]))]), { optional: true })
            ])
        ]),
        // trigger('anim', [
        //     transition('* => void', [
        //         style({ height: '*', opacity: '1', transform: 'translateX(0)', 'box-shadow': '0 1px 4px 0 rgba(0, 0, 0, 0.3)' }),
        //         sequence([
        //             animate('.25s ease', style({ height: '*', opacity: '.2', transform: 'translateX(20px)', 'box-shadow': 'none' })),
        //             animate('.1s ease', style({ height: '0', opacity: 0, transform: 'translateX(20px)', 'box-shadow': 'none' }))
        //         ])
        //     ]),
        //     transition('void => active', [
        //         style({ height: '0', opacity: '0', transform: 'translateX(20px)', 'box-shadow': 'none' }),
        //         sequence([
        //             animate('.1s ease', style({ height: '*', opacity: '.2', transform: 'translateX(20px)', 'box-shadow': 'none' })),
        //             animate('.35s ease', style({ height: '*', opacity: 1, transform: 'translateX(0)', 'box-shadow': '0 1px 4px 0 rgba(0, 0, 0, 0.3)' }))
        //         ])
        //     ])
        // ])
    ]
})
export class ActivityComponent implements OnInit {
    public isLoading: boolean;
    public page: Page<ActivityViewModel>;
    // tslint:disable-next-line:no-output-on-prefix
    @Output() public allNotificatoinsOpened: EventEmitter<void> = new EventEmitter<void>();
    private markAsReadList: number[];
    private markAsRead: Subject<number[]> = new Subject<number[]>();

    constructor(
        private route: ActivatedRoute,
        public dialog: MatDialog,
        private userService: UserService,
        private activityService: ActivityService) { }

    public close(event) {
        this.allNotificatoinsOpened.next();
    }

    public appear(event: any, activity: ActivityViewModel) {
        if (!activity.isMarkedAsRead) {
            if (!this.markAsReadList) {
                this.markAsReadList = Array<number>();
            }

            this.markAsReadList.push(activity.id);
            this.markAsRead.next(this.markAsReadList);
        }
    }

    public getRecentActivities() {
        this.isLoading = true;

        this.activityService.getRecentActivity(this.page.pagination)
            .pipe(finalize(() => {
                this.isLoading = false;
            }))
            .subscribe(page => {
                this.page = page;
            });
    }

    public onPositionChange() {
        if (!this.isLoading && this.page && this.page.hasMoreItems) {
            this.getRecentActivities();
        }
    }

    public removeActivity(index, activity: ActivityViewModel) {
        this.page.data.splice(index, 1);
        this.activityService.removeActivity(activity.id)
            .subscribe(() => { });
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
        this.page = this.route.snapshot.data['activities'];

        this.markAsRead.pipe(debounceTime(1000))
            .subscribe(ids => {
                this.activityService.markAsRead(ids)
                    .subscribe(() => {
                        this.page.data.filter(e => ids.includes(e.id)).forEach((activity) => {
                            activity.isMarkedAsRead = true;
                        });

                        this.markAsReadList = [];
                    });
            });
    }
}
