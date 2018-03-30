import { AfterViewInit, AfterViewChecked, Component, Input, Output, EventEmitter, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { CurrentUserService } from 'app/infrastructure/services';
import { AccountService } from 'app/account/services';
import { CurrentUserViewModel } from 'app/models/view';
import { RequestsService } from 'app/services';
import { Uploader } from 'app/core/services';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy, AfterViewChecked, AfterViewInit {
    private _currentUser: CurrentUserViewModel;
    private currentUserSubscription: Subscription;
    private isResolvingExplorePeople: boolean;
    private isResolvingUserMedia: boolean;

    public incommingRequestsCount: number;
    public renderToolbar: boolean;
    @Output() public openNotificationsEvent = new EventEmitter<boolean>();

    constructor(
        private cd: ChangeDetectorRef,
        private currentUserService: CurrentUserService,
        private incommingRequestsService: RequestsService,
        private accountService: AccountService,
        private router: Router) {
    }

    public get currentUser(): CurrentUserViewModel {
        return this._currentUser;
    }

    public set currentUser(value: CurrentUserViewModel) {
        this._currentUser = value;
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

            this.router.navigateByUrl(this._currentUser.username)
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
                this.updateCurrentUser(currentUser);
            });

        this.incommingRequestsService.incommingRequests.subscribe(count => {
            this.incommingRequestsCount = count;
        });
    }

    public ngOnDestroy(): void {
        this.currentUserSubscription.unsubscribe();
    }

    public ngAfterViewInit(): void {
        this.cd.detectChanges();
    }

    public ngAfterViewChecked(): void {
        this.cd.detectChanges();
    }

    private updateCurrentUser(currentUser: CurrentUserViewModel) {
        if (this._currentUser && currentUser) {
            const properties = Object.getOwnPropertyNames(currentUser);

            properties.forEach(propertyName => {
                this._currentUser[propertyName] = currentUser[propertyName];
            });
        } else {
            this.currentUser = currentUser;
        }
    }
}
