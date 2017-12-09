import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSidenav } from '@angular/material';
import { trigger, transition, style, animate } from '@angular/animations';
import { CurrentUserService } from 'app/infrastructure/services';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [
        trigger('enterTransition', [
            transition(':enter', [
                style({ transform: 'translateX(50px)', opacity: 0 }),
                animate('1200ms cubic-bezier(0.35, 0, 0.25, 1)', style('*'))
            ])
        ])
    ]
})
export class AppComponent implements OnInit {
    @ViewChild('notificationsSidenav')
    public notificationsSidenav: MatSidenav;
    public renderToolbar = false;
    public initialLoad = true;

    constructor(
        private router: Router,
        private currentUserService: CurrentUserService) {
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
        this.router.events.subscribe((event: any): void => {
            this.navigationInterceptor(event);
        });
    }
}
