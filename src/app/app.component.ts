import { Component, ViewChild, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, NavigationEnd, NavigationStart, NavigationCancel, ResolveStart, ResolveEnd } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { trigger, transition, style, animate } from '@angular/animations';

import { CurrentUserService } from 'app/infrastructure/services';

import { NgProgress } from 'ngx-progressbar';
import { RequestsService } from 'app/services';
import { CurrentUserViewModel } from 'app/models/view';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    @ViewChild('notificationsSidenav')
    public notificationsSidenav: MatSidenav;
    public renderToolbar = false;
    public renderFooter = false;
    public initialLoad = true;
    public currentUser: CurrentUserViewModel;
    public showAuthenticationBar = true;

    constructor(
        private router: Router,
        private currentUserService: CurrentUserService,
        private progress: NgProgress,
        private incommingRequestsService: RequestsService) {
        this.currentUserService.getCurrentUser(true)
            .subscribe(currentUser => {
                this.currentUser = currentUser;
                this.initialLoad = false;
                this.renderFooter = true;
            });
    }

    public openNotifications($event: boolean) {
        this.notificationsSidenav.open();
    }

    public closeNotifications($event: any) {
        this.notificationsSidenav.close();
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
                this.progress.done();
            }

            this.navigationInterceptor(event);
        });
    }

    private navigationInterceptor(event): void {
        if (event instanceof NavigationEnd) {
            if (this.currentUser) {
                this.hideAuthenticationBar()
            }

            this.renderFooter = this.router.url !== null;

            // this.renderFooter = this.router.url !== '/account/signin'
            //     && this.router.url !== '/account/create'
            //     && this.router.url !== '/account/recover'
            //     && this.router.url !== '/account/autologin';

            this.renderToolbar =
                this.router.url !== '/account/signin' &&
                this.router.url !== '/account/create' &&
                this.router.url !== '/account/recover' &&
                this.router.url !== '/account/autologin';
        }
    }
}
