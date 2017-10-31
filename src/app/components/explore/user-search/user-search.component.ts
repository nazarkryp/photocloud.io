import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs/Rx';

import { UserService } from '../../../services';
import { UserProvider } from '../../../infrastructure/providers';
import { Collection, User, CurrentUser, RelationshipAction, RelationshipStatus } from '../../../common/models';

import { NgProgress } from 'ngx-progressbar';

@Component({
    selector: 'app-user-search',
    templateUrl: './user-search.component.html',
    styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit, OnDestroy {
    private title = 'Explore People';
    private isLoading: boolean;
    private page: Collection<User>;
    private modifying: { [id: number]: boolean } = {};
    private currentUser: CurrentUser;
    private currentUserSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private userProvider: UserProvider,
        private progressService: NgProgress) {
        this.currentUserSubscription = this.userProvider.getCurrentUserAsObservable()
            .subscribe((user) => {
                this.currentUser = user;
            });
    }

    private getUsers() {
        this.progressService.start();

        this.userService.getUsers(this.page.pagination)
            .finally(() => {
                this.progressService.done();
                this.isLoading = false;
            })
            .subscribe((page: Collection<User>) => {
                this.page.hasMoreItems = page.hasMoreItems;
                this.page.pagination = page.pagination;
                if (page.data) {
                    this.page.data = this.page.data.concat(page.data);
                    page.data.map((user: User) => {
                        this.modifying[user.id] = false;
                    });
                }
            }, () => { });
    }

    private modifyRelationship(user: User) {
        this.modifying[user.id] = true;
        const action = this.getRelationshipAction(user.incommingStatus);
        this.userService.modifyRelationship(user.id, { action: action })
            .finally(() => {
                this.modifying[user.id] = false;
            })
            .subscribe((userResponse: User) => {
                user.incommingStatus = userResponse.incommingStatus;
            }, error => { });
    }

    private getRelationshipAction(incommingStatus: RelationshipStatus): number {
        if (incommingStatus === RelationshipStatus.Following) {
            return 1;
        } else if (incommingStatus === RelationshipStatus.Requested) {
            return 1;
        } else if (incommingStatus === RelationshipStatus.Blocked) {
            return 4;
        }

        return 0;
    }

    public ngOnInit() {
        this.page = this.route.snapshot.data['page'];
        if (this.page.data) {
            this.page.data.map((user: User) => {
                this.modifying[user.id] = false;
            });
        }
    }

    public ngOnDestroy() {
        this.currentUserSubscription.unsubscribe();
    }
}
