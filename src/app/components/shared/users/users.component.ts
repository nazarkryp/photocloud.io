import { Component, OnInit, OnDestroy, Optional, Inject, ViewEncapsulation } from '@angular/core';
import { MdDialogRef, MdSnackBarConfig, MdSnackBar, MD_DIALOG_DATA } from '@angular/material';
import { Observable, Subscription } from 'rxjs/Rx';

import { CurrentUser, User, RelationshipStatus } from '../../../common/models';
import { UserService } from '../../../services';
import { UserProvider } from '../../../infrastructure/providers';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit, OnDestroy {
    private users: User[];
    private currentUser: CurrentUser;
    private usersObservableSubscription: Subscription;
    private currentUserSubscription: Subscription;
    private modifying: { [id: number]: boolean } = {};
    private title: string;

    constructor(
        public dialogRef: MdDialogRef<UsersComponent>,
        @Inject(MD_DIALOG_DATA) data: any,
        private userService: UserService,
        private userProvider: UserProvider) {
        this.title = data.title;
        this.usersObservableSubscription = data.usersObservable.subscribe(users => {
            this.users = users;
            users.map((user: User) => {
                this.modifying[user.id] = false;
            });
        });

        this.currentUserSubscription = this.userProvider.getCurrentUserAsObservable()
            .subscribe(currentUser => {
                this.currentUser = currentUser;
            });
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
    }

    public ngOnDestroy(): void {
        this.usersObservableSubscription.unsubscribe();
        this.currentUserSubscription.unsubscribe();
    }
}
