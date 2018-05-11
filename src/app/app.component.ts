import { Component, ViewChild, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, NavigationEnd, NavigationStart, NavigationCancel, ResolveStart, ResolveEnd } from '@angular/router';
import { MatSidenav, MatDialog } from '@angular/material';
import { trigger, transition, style, animate } from '@angular/animations';

import { Observable, Observer } from 'rxjs';

import { HubConnectionService } from 'app/core/services/communication';
import { CurrentUserService } from 'app/infrastructure/services';
import { ProgressService } from 'app/shared/services';
import { RequestsService } from 'app/services';
import { CurrentUserViewModel } from 'app/models/view';
import { NotificationsComponent } from './components/notifications/notifications.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    @ViewChild('requestsSidenav')
    public requestsSidenav: MatSidenav;
    public renderToolbar = false;
    public renderFooter = false;
    public initialLoad = true;
    public currentUser: CurrentUserViewModel;
    public showAuthenticationBar = true;

    constructor(
        public progress: ProgressService,
        private router: Router,
        private dialog: MatDialog,
        private connection: HubConnectionService,
        private currentUserService: CurrentUserService,
        private incommingRequestsService: RequestsService) {
        this.currentUserService.getCurrentUser(true)
            .subscribe(currentUser => {
                this.currentUser = currentUser;
                this.initialLoad = false;
            });

        this.connection.start();
    }

    public openRequests($event: boolean) {
        this.requestsSidenav.open();
    }

    public closeNotifications($event: any) {
        this.requestsSidenav.close();
    }

    public hideAuthenticationBar() {
        this.showAuthenticationBar = false;
    }

    public ngOnInit(): void {
        this.router.events.subscribe(event => {
            if (event instanceof ResolveStart) {
                this.progress.start();
            } else if (event instanceof ResolveEnd) {
                window.scrollTo(0, 0);
                this.progress.complete();
            }

            this.navigationInterceptor(event);
        });
    }

    private navigationInterceptor(event): void {
        if (event instanceof NavigationEnd) {
            if (this.currentUser) {
                this.hideAuthenticationBar();
            }

            this.renderFooter = this.router.url !== null;

            if (['about', 'terms', 'privacy', 'account', '/account/'].some(ex => this.router.url.includes(ex))) {
                this.hideAuthenticationBar();
            }

            this.renderToolbar =
                this.router.url !== '/account/signin' &&
                this.router.url !== '/account/create' &&
                this.router.url !== '/account/recover' &&
                this.router.url !== '/account/restore';
        }
    }
}
