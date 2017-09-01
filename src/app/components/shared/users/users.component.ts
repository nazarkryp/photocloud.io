import { Component, OnInit, OnDestroy, Optional, Inject } from '@angular/core';
import { MdDialogRef, MdSnackBarConfig, MdSnackBar, MD_DIALOG_DATA } from '@angular/material';
import { Observable, Subscription } from 'rxjs/Rx';

import { CurrentUser, User, RelationshipStatus } from '../../../common/models';
import { UserService } from '../../../services';
import { UserProvider } from '../../../infrastructure/providers';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
    private users: User[];
    private currentUser: CurrentUser;
    private usersObservableSubscription: Subscription;
    private currentUserSubscription: Subscription;
    private isModifyingRelationship: boolean;

    constructor(
        public dialogRef: MdDialogRef<UsersComponent>,
        @Inject(MD_DIALOG_DATA) private usersObservable: Observable<User[]>,
        private userService: UserService,
        private userProvider: UserProvider) {
        this.usersObservableSubscription = this.usersObservable.subscribe(users => {
            this.users = users;
        });

        this.currentUserSubscription = this.userProvider.getCurrentUserAsObservable()
            .subscribe(currentUser => {
                this.currentUser = currentUser;
            });
    }

    private modifyRelationship(user: User) {
        let action: number;

        if (user.incommingStatus === RelationshipStatus.None) {
            action = 0;
        } else if (user.incommingStatus === RelationshipStatus.Following) {
            action = 1;
        } else if (user.incommingStatus === RelationshipStatus.Requested) {
            action = 1;
        } else if (user.incommingStatus === RelationshipStatus.Blocked) {
            action = 4;
        }

        this.isModifyingRelationship = true;
        this.userService.modifyRelationship(user.id, {
            action: action
        }).subscribe(userResponse => {
            user = userResponse;
        }, error => { }, () => {
            this.isModifyingRelationship = false;
        });
    }

    public ngOnInit() {
    }

    public ngOnDestroy(): void {
        this.usersObservableSubscription.unsubscribe();
        this.currentUserSubscription.unsubscribe();
    }
}
