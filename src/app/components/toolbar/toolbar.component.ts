import { AfterViewInit, AfterViewChecked, Component, Input, Output, EventEmitter, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatMenuTrigger } from '@angular/material';

import { Subscription } from 'rxjs';

import { CurrentUserService } from 'app/infrastructure/services';
import { AccountService } from 'app/account/services';
import { ActivityService } from 'app/services/activity';
import { RequestsService } from 'app/services';
import { Uploader } from 'app/core/services';
import { CurrentUserViewModel, ActivityViewModel, ActivityPage } from 'app/models/view';
import { ScrollDirection } from 'app/shared/directives/header-scroll.directive';
import { NotificationsComponent } from 'app/components/notifications/notifications.component';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy, AfterViewChecked, AfterViewInit {
    private currentUserSubscription: Subscription;
    private menuSubscription: Subscription;
    private _trigger: MatMenuTrigger;

    public currentUser: CurrentUserViewModel;
    public unreadActivitiesCount: number;
    public scrolled: boolean;
    public scrolledDown: boolean;
    @Output() public requestsOpened = new EventEmitter<boolean>();

    public notifications: ActivityPage;

    @ViewChild(MatMenuTrigger) private set trigger(value: MatMenuTrigger) {
        this._trigger = value;

        if (this._trigger) {
            this.menuSubscription = this._trigger.menuOpened.subscribe(() => this.appNotifications.markAsRead());
        } else if (this.menuSubscription && !this.menuSubscription.closed) {
            this.menuSubscription.unsubscribe();
        }
    }

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

    public openMenu() {

    }

    public ngOnInit(): void {
        this.currentUserSubscription = this.currentUserService.getCurrentUser()
            .subscribe(currentUser => {
                this.updateCurrentUser(currentUser);

                if (this.currentUserService.isAuthenticated) {
                    this.activityService.getRecentActivity().subscribe();
                }
            });

        this.activityService.activity.subscribe(activity => {
            this.unreadActivitiesCount = activity ? activity.unread : null;
        });
    }

    public ngOnDestroy(): void {
        this.currentUserSubscription.unsubscribe();
        if (this.menuSubscription && !this.menuSubscription.closed) {
            this.menuSubscription.unsubscribe();
        }
    }

    public ngAfterViewChecked(): void {
        this.cd.detectChanges();
    }

    public ngAfterViewInit(): void {
        // this.menuSubscription = this.trigger.menuOpened.subscribe(() => {
        //     this.appNotifications.markAsRead();
        // });
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

    // private configureNotificationsMenu() {
    //     if (this.trigger && (!this.menuSubscription || this.menuSubscription.closed)) {
    //         this.menuSubscription = this.trigger.onMenuOpen.subscribe(() => {
    //             this.appNotifications.markAsRead();
    //         });
    //     } else {
    //         if (this.menuSubscription && !this.menuSubscription.closed) {
    //             this.menuSubscription.unsubscribe();
    //         }
    //     }
    // }
}
