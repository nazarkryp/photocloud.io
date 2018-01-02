import { Component, ViewChild, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, NavigationEnd, NavigationStart, NavigationCancel, ResolveStart, ResolveEnd } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { trigger, transition, style, animate } from '@angular/animations';

import { CurrentUserService } from 'app/infrastructure/services';

import { NgProgress } from 'ngx-progressbar';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    @ViewChild('notificationsSidenav')
    public notificationsSidenav: MatSidenav;
    public renderToolbar = false;
    public initialLoad = true;

    constructor(
        private router: Router,
        private currentUserService: CurrentUserService,
        private progress: NgProgress) {
        this.currentUserService.getCurrentUser(true)
            .take(1)
            .subscribe(currentUser => {
                this.initialLoad = false;
            });
    }

    public openNotifications($event: boolean) {
        this.notificationsSidenav.open();
    }

    public closeNotifications($event: any) {
        this.notificationsSidenav.close();
    }

    public navigationInterceptor(event): void {
        if (event instanceof NavigationEnd) {
            this.renderToolbar = this.router.url !== '/account/signin'
                && this.router.url !== '/account/create'
                && this.router.url !== '/account/recover';
        }
    }

    public ngOnInit(): void {
        this.router.events.subscribe(event => {
            if (event instanceof ResolveStart) {
                this.progress.start();
            } else if (event instanceof ResolveEnd) {
                this.progress.done();
            }

            this.navigationInterceptor(event);
        });
    }
}
