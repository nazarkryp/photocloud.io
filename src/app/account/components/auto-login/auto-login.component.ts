import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CurrentUserService } from 'app/infrastructure/services';
import { CurrentUserViewModel } from '../../../models/view';

@Component({
    selector: 'app-auto-login',
    templateUrl: './auto-login.component.html',
    styleUrls: ['./auto-login.component.css']
})
export class AutoLoginComponent implements OnInit {
    public currentUser: CurrentUserViewModel;

    constructor(
        private router: Router,
        private currentUserService: CurrentUserService) {
        this.currentUser = this.currentUserService.retrieveCurrentUser();
    }

    public continue() {
        this.router.navigateByUrl('/');
    }

    public logout() {
        this.currentUserService.signOut();
        this.router.navigateByUrl('/account/signin');
    }

    ngOnInit() {
    }
}
