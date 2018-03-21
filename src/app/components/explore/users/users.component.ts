import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

import { Subscription } from 'rxjs/Subscription';

import { UserService } from 'app/services';
import { Page, UserViewModel, CurrentUserViewModel } from 'app/models/view';
import { RelationshipAction, RelationshipStatus } from 'app/models/shared';

import { NgProgress } from 'ngx-progressbar';
import { CurrentUserService } from 'app/infrastructure/services';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css'],
    animations: [
        trigger('listAnimation', [
            transition('* => *', [ // each time the binding value changes
                query(':leave', [
                    stagger(50, [
                        animate('0.5s', style({ opacity: 0 }))
                    ])
                ], { optional: true }),
                query(':enter', [
                    style({ opacity: 0 }),
                    stagger(50, [
                        animate('0.5s', style({ opacity: 1 }))
                    ])
                ], { optional: true })
            ])
        ])
    ]
})
export class UsersComponent implements OnInit, OnDestroy {
    private currentUserSubscription: Subscription;
    public title = 'Explore People';
    public isLoading: boolean;
    public page: Page<UserViewModel>;
    public modifying: { [id: number]: boolean } = {};
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
                    page.data.map((user: UserViewModel) => {
                        this.modifying[user.id] = false;
                    });
                }
            }, () => { });
    }

    public modifyRelationship(user: UserViewModel) {
        this.modifying[user.id] = true;
        const action = this.getRelationshipAction(user.relationship.outgoingStatus);
        this.userService.modifyRelationship(user.id, { action: action })
            .finally(() => {
                this.modifying[user.id] = false;
            })
            .subscribe((userResponse: UserViewModel) => {
                user.relationship.outgoingStatus = userResponse.relationship.outgoingStatus;
            }, error => { });
    }

    public getRelationshipAction(outgoing: RelationshipStatus): number {
        if (outgoing === RelationshipStatus.Following) {
            return 1;
        } else if (outgoing === RelationshipStatus.Requested) {
            return 1;
        } else if (outgoing === RelationshipStatus.Blocked) {
            return 4;
        }

        return 0;
    }

    public ngOnInit() {
        this.page = this.route.snapshot.data['page'];
        if (this.page.data) {
            this.page.data.map((user: UserViewModel) => {
                this.modifying[user.id] = false;
            });
        }
    }

    public refresh() {
        this.page.pagination = null;
        this.modifying = {};
        this.getUsers();
    }

    public ngOnDestroy() {
        this.currentUserSubscription.unsubscribe();
    }
}
