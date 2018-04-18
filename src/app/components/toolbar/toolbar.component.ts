import { AfterViewInit, AfterViewChecked, Component, Input, Output, EventEmitter, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { CurrentUserService } from 'app/infrastructure/services';
import { AccountService } from 'app/account/services';
import { CurrentUserViewModel, Page, ActivityViewModel } from 'app/models/view';
import { RequestsService, ActivityService } from 'app/services';
import { Uploader } from 'app/core/services';
import { ScrollDirection } from 'app/shared/directives/header-scroll.directive';
import { MatMenuTrigger } from '@angular/material';

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

    public incommingRequestsCount: number;
    public scrolled: boolean;
    public scrolledDown: boolean;
    @Output() public openNotificationsEvent = new EventEmitter<boolean>();

    public notifications: Page<ActivityViewModel>;

    @ViewChild(MatMenuTrigger) public trigger: MatMenuTrigger;

    constructor(
        private cd: ChangeDetectorRef,
        private currentUserService: CurrentUserService,
        private incommingRequestsService: RequestsService,
        private accountService: AccountService,
        private router: Router) {
    }

    public onMenuOpened(event) {
        console.log(event);
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
        this.trigger.closeMenu();
        this.router.navigate(['activity']);
        // this.openNotificationsEvent.emit(true);
    }

    public ngOnInit(): void {
        this.currentUserSubscription = this.currentUserService.getCurrentUser()
            .subscribe(currentUser => {
                this.updateCurrentUser(currentUser);
            });

        this.incommingRequestsService.incommingRequests.subscribe(count => {
            this.incommingRequestsCount = count;
        });
    }

    public onPositionChange(event) {
        this.trigger.closeMenu();
        this.scrolled = event;
    }

    public onScrollDirectionChange(event) {
        this.scrolledDown = event === ScrollDirection.Down;
    }

    public ngOnDestroy(): void {
        this.currentUserSubscription.unsubscribe();
    }

    public ngAfterViewInit(): void {
        this.cd.detectChanges();

        this.trigger.menuOpened.subscribe(() => {
        });
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
