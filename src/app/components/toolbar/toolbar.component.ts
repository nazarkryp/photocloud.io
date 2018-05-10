import { AfterViewInit, AfterViewChecked, Component, Input, Output, EventEmitter, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatMenuTrigger } from '@angular/material';

import { Subscription } from 'rxjs';

import { CurrentUserService } from 'app/infrastructure/services';
import { AccountService } from 'app/account/services';
import { ActivityService } from 'app/services/activity';
import { RequestsService } from 'app/services';
import { Uploader } from 'app/core/services';
import { CurrentUserViewModel, Page, ActivityViewModel } from 'app/models/view';
import { ScrollDirection } from 'app/shared/directives/header-scroll.directive';
import { NotificationsComponent } from 'app/components/notifications/notifications.component';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy, AfterViewChecked, AfterViewInit {
    public currentUser: CurrentUserViewModel;
    private currentUserSubscription: Subscription;
    private isResolvingExplorePeople: boolean;
    private isResolvingUserMedia: boolean;

    public unreadActivitiesCount: number;
    public scrolled: boolean;
    public scrolledDown: boolean;
    // tslint:disable-next-line:no-output-on-prefix
    @Output() public requestsOpened = new EventEmitter<boolean>();

    public notifications: Page<ActivityViewModel>;

    @ViewChild(MatMenuTrigger) public trigger: MatMenuTrigger;
    @ViewChild('appNotifications') public appNotifications: NotificationsComponent;

    constructor(
        private cd: ChangeDetectorRef,
        private activityService: ActivityService,
        private currentUserService: CurrentUserService,
        private incommingRequestsService: RequestsService,
        private accountService: AccountService,
        private router: Router) {
    }

    public get isMenuOpened(): boolean {
        return this.trigger ? this.trigger.menuOpen : false;
    }

    public get isAuthenticated(): boolean {
        return this.currentUserService.isAuthenticated;
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
        if (this.trigger) {
            this.trigger.closeMenu();
        }

        this.router.navigate(['activity', 'recent']);
    }

    public openRequests() {
        if (this.trigger) {
            this.trigger.closeMenu();
        }

        this.requestsOpened.emit(true);
    }

    public onPositionChange(event) {
        if (this.trigger) {
            this.trigger.closeMenu();
        }

        this.scrolled = event;
    }

    public onScrollDirectionChange(event) {
        this.scrolledDown = event === ScrollDirection.Down;
    }

    public ngOnInit(): void {
        this.currentUserSubscription = this.currentUserService.getCurrentUser()
            .subscribe(currentUser => {
                this.updateCurrentUser(currentUser);
            });

        this.activityService.activity.subscribe(activity => {
            this.unreadActivitiesCount = activity ? activity.unread : null;
        });
    }

    public ngOnDestroy(): void {
        this.currentUserSubscription.unsubscribe();
    }

    public ngAfterViewInit(): void {
        this.cd.detectChanges();

        if (this.trigger) {
            this.trigger.onMenuOpen.subscribe(() => {
                this.appNotifications.markAsRead();
            });
        }
    }

    public ngAfterViewChecked(): void {
        this.cd.detectChanges();
    }

    private updateCurrentUser(currentUser: CurrentUserViewModel) {
        if (this.currentUser && currentUser) {
            const properties = Object.getOwnPropertyNames(currentUser);

            properties.forEach(propertyName => {
                this.currentUser[propertyName] = currentUser[propertyName];
            });
        } else {
            this.currentUser = currentUser;
        }
    }
}
