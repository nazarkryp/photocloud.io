import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CurrentUserService } from 'app/infrastructure/services';
import { CurrentUserViewModel } from '../../../models/view';

@Component({
    templateUrl: './auto-login.component.html',
    styleUrls: ['./auto-login.component.css']
})
export class AutoLoginComponent implements OnInit {
    public currentUser: CurrentUserViewModel;

    constructor(
        private router: Router,
        public route: ActivatedRoute,
        private currentUserService: CurrentUserService) {
        this.currentUser = this.currentUserService.retrieveCurrentUser();
    }

    public continue(code: string = null) {
        this.currentUserService.signInWithCode(code)
            .subscribe(() => {
                this.router.navigateByUrl('/');
            });
    }

    public logout() {
        this.currentUserService.signOut();
        this.router.navigateByUrl('/account/signin');
    }

    public ngOnInit() {
        this.route.paramMap.subscribe(param => {
            const code = param.get('code');

            if (code) {
                this.currentUser = null;
                this.continue(code);
            }
        });
    }
}
