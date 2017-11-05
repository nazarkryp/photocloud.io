import { Component, OnInit, OnDestroy, Optional, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MatSnackBarConfig, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
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
    public users: User[];
    public currentUser: CurrentUser;
    public usersObservableSubscription: Subscription;
    public currentUserSubscription: Subscription;
    public modifying: { [id: number]: boolean } = {};
    public title: string;

    constructor(
        public dialogRef: MatDialogRef<UsersComponent>,
        @Inject(MAT_DIALOG_DATA) data: any,
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

    public modifyRelationship(user: User) {
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

    public getRelationshipAction(incommingStatus: RelationshipStatus): number {
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
