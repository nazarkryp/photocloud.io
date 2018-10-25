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
import { PromptService } from 'app/modules/prompt';
import { MediaViewService } from '../media-view/services/media-view.service';

@Component({
    templateUrl: './activity.component.html',
    styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
    private markAsReadList: number[];
    private markAsRead: Subject<number[]> = new Subject<number[]>();

    @Output() public allNotificatoinsOpened: EventEmitter<void> = new EventEmitter<void>();
    public isLoading: boolean;
    public page: Page<ActivityViewModel>;

    constructor(
        private route: ActivatedRoute,
        private mediaViewService: MediaViewService,
        private prompt: PromptService,
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
        this.prompt.prompt({
            title: 'CLEAR RECENT ACTIVITY',
            description: 'Are you sure you want to clear all activity history? You won\'t be able to undo that action.'
        }).subscribe(confirmed => {
            if (confirmed) {
                this.activityService.removeAllActivities()
                    .subscribe(() => {
                        this.page = new Page<ActivityViewModel>();
                    });
            }
        });
    }

    public openMedia(media) {
        this.mediaViewService.open(media);
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
                this.page.data.filter(e => ids.includes(e.id)).forEach((activity) => {
                    activity.isMarkedAsRead = true;
                });

                this.activityService.markAsRead(ids)
                    .subscribe(() => {
                        this.markAsReadList = [];
                    });
            });
    }
}
