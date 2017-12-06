import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AccountService } from 'app/account/services';
import { CurrentUser } from 'app/common/models';
import { CurrentUserService } from 'app/infrastructure/services';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {
    public date: Date = new Date();

    private currentUserSubscription: Subscription;
    public currentUser: CurrentUser;
    public renderToolbar: boolean;
    @Output() openNotificationsEvent = new EventEmitter<boolean>();

    constructor(
        private currentUserService: CurrentUserService,
        private accountService: AccountService,
        private router: Router) {
    }

    public openNotifications() {
        this.openNotificationsEvent.emit(true);
    }

    public navigationInterceptor(event): void {
        if (event instanceof NavigationEnd) {
            this.renderToolbar = this.router.url !== '/account/signin' && this.router.url !== '/account/create';
        }
    }

    public ngOnInit(): void {
        this.router.events.subscribe((event: any): void => {
            this.navigationInterceptor(event);
        });

        this.currentUserSubscription = this.currentUserService
            .getCurrentUser()
            .subscribe(currentUser => {
                this.currentUser = currentUser;
            });
    }

    public ngOnDestroy(): void {
        this.currentUserSubscription.unsubscribe();
    }
}
