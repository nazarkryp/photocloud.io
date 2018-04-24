import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { Page, UserViewModel, CurrentUserViewModel } from 'app/models/view';
import { UserService } from 'app/services';
import { CurrentUserService } from 'app/infrastructure/services';

import { NgProgress } from 'ngx-progressbar';

@Component({
    selector: 'app-manage-users',
    templateUrl: './manage-users.component.html',
    styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit, OnDestroy {
    private currentUserSubscription: Subscription;
    public title = 'Explore People';
    public isLoading: boolean;
    public page: Page<UserViewModel>;
    public currentUser: CurrentUserViewModel;

    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private currentUserService: CurrentUserService,
        private progress: NgProgress) {
        this.currentUserSubscription = this.currentUserService.getCurrentUser()
            .subscribe((user) => {
                this.currentUser = user;
            });
    }

    public getUsers() {
        this.progress.start();
        this.isLoading = true;

        this.userService.getUsers(this.page.pagination)
            .finally(() => {
                this.progress.done();
                this.isLoading = false;
            })
            .subscribe((page: Page<UserViewModel>) => {
                if (!this.page.pagination) {
                    this.page = new Page<UserViewModel>();
                }

                this.page.hasMoreItems = page.hasMoreItems;
                this.page.pagination = page.pagination;
                if (page.data) {
                    this.page.data = this.page.data.concat(page.data);
                }
            }, () => { });
    }

    public invertUserStatus(user: UserViewModel) {
        this.userService.update(user.id, {
            isActive: !user.isActive
        }).finally(() => { }).subscribe(updatesUser => {
            user.isActive = updatesUser.isActive;
            user.pictureUri = updatesUser.pictureUri;
        });
    }

    public ngOnInit() {
        this.page = this.route.snapshot.data['page'];
    }

    public refresh() {
        this.page.pagination = null;
        this.getUsers();
    }

    public ngOnDestroy() {
        this.currentUserSubscription.unsubscribe();
    }
}
