import { Component, OnInit, OnDestroy, Optional, Inject, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MatSnackBarConfig, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { CurrentUserViewModel, UserViewModel } from 'app/models/view';
import { RelationshipStatus } from 'app/models/shared';
import { UserService } from 'app/services';
import { CurrentUserService } from 'app/infrastructure/services';

import { NgProgress } from 'ngx-progressbar';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
    public users: UserViewModel[];
    @Output() public onClose = new EventEmitter<any>();

    @Input() public config: {
        usersObservable: Observable<UserViewModel[]>,
        title: string
    };

    public currentUser: CurrentUserViewModel;
    public usersObservableSubscription: Subscription;
    public title: string;

    constructor(
        @Optional() public dialogRef: MatDialogRef<UsersComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
        private progress: NgProgress,
        private userService: UserService,
        private currentUserService: CurrentUserService) {
        this.currentUser = this.currentUserService.retrieveCurrentUser();
    }

    public modifyRelationship(user: UserViewModel) {
        if (user.isModifyingRelationship) {
            return;
        }

        user.isModifyingRelationship = true;

        const action = this.getRelationshipAction(user.relationship.incommingStatus);
        this.userService.modifyRelationship(user.id, { action: action })
            .finally(() => {
                user.isModifyingRelationship = false;
            })
            .subscribe((userResponse: UserViewModel) => {
                user.relationship.incommingStatus = userResponse.relationship.incommingStatus;
            });
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

    public close() {
        if (this.config) {
            this.onClose.next(null);
        } else if (this.dialogRef) {
            this.dialogRef.close();
        }
    }

    public ngOnDestroy(): void {
        if (this.usersObservableSubscription && !this.usersObservableSubscription.closed) {
            this.usersObservableSubscription.unsubscribe();
        }
    }

    public ngOnInit(): void {
        this.progress.start();
        if (this.data.usersObservable) {
            this.title = this.data.title;
            this.usersObservableSubscription = this.data.usersObservable.subscribe(users => {
                this.users = users;
                this.progress.done();
            });
        } else if (this.config) {
            this.title = this.config.title;
            this.usersObservableSubscription = this.config.usersObservable.subscribe(users => {
                this.users = users;
                this.progress.done();
            });
        }
    }
}
