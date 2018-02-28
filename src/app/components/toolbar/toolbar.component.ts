import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { CurrentUserService } from 'app/infrastructure/services';
import { AccountService } from 'app/account/services';
import { CurrentUserViewModel } from 'app/models/view';
import { RequestsService } from 'app/services';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {
    private currentUserSubscription: Subscription;
    private isResolvingExplorePeople: boolean;
    private isResolvingUserMedia: boolean;

    public currentUser: CurrentUserViewModel;
    public incommingRequestsCount: number;
    public renderToolbar: boolean;
    @Output() public openNotificationsEvent = new EventEmitter<boolean>();

    constructor(
        private currentUserService: CurrentUserService,
        private incommingRequestsService: RequestsService,
        private accountService: AccountService,
        private router: Router) {
    }

    public explorePeople() {
        if (!this.isResolvingExplorePeople) {
            this.isResolvingExplorePeople = true;

            this.router.navigateByUrl('/explore/people')
                .then(() => {
                    this.isResolvingExplorePeople = false;
                })
                .catch(() => {
                    this.isResolvingExplorePeople = false;
                });
        }
    }

    public profile() {
        if (!this.isResolvingUserMedia) {
            this.isResolvingUserMedia = true;

            this.router.navigateByUrl(this.currentUser.username)
                .then(() => {
                    this.isResolvingUserMedia = false;
                }).catch(() => {
                    this.isResolvingUserMedia = false;
                });
        }
    }

    public openNotifications() {
        this.openNotificationsEvent.emit(true);
    }

    public ngOnInit(): void {
        this.currentUserSubscription = this.currentUserService.getCurrentUser()
            .subscribe(currentUser => {
                this.currentUser = currentUser;
            });

        this.incommingRequestsService.incommingRequests.subscribe(count => {
            this.incommingRequestsCount = count;
        });
    }

    public ngOnDestroy(): void {
        this.currentUserSubscription.unsubscribe();
    }
}
