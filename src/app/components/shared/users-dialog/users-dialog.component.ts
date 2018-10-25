import { Component, OnInit, OnDestroy, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

import { Subscription } from 'rxjs';

import { CurrentUserViewModel, UserViewModel, Page } from 'app/models/view';
import { RelationshipStatus } from 'app/models/shared';
import { UserService } from 'app/services';
import { CurrentUserService } from 'app/infrastructure/services';

import { UserDialogDetails } from './models';
import { finalize } from 'rxjs/operators';

@Component({
    templateUrl: './users-dialog.component.html',
    styleUrls: ['./users-dialog.component.css'],
    animations: [
        trigger('listAnimation', [
            transition('* => *', [
                query(':enter', [
                    style({
                        opacity: 0,
                        transform: 'translateY(20%)'
                    }),
                    stagger(50, [
                        animate('0.25s', style({
                            opacity: 1,
                            transform: 'translateY(0)'
                        }))
                    ])
                ], { optional: true })
            ])
        ])
    ]
})
export class UsersDialogComponent implements OnInit, OnDestroy {
    public page: Page<UserViewModel> = new Page<UserViewModel>();

    public currentUser: CurrentUserViewModel;
    public usersObservableSubscription: Subscription;
    public title: string;
    public isLoading: boolean;

    constructor(
        @Optional() public dialogRef: MatDialogRef<UsersDialogComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public details: UserDialogDetails,
        private userService: UserService,
        private currentUserService: CurrentUserService) {
        this.currentUser = this.currentUserService.retrieveCurrentUser();
    }

    public getUsers() {
        this.isLoading = true;

        this.usersObservableSubscription = this.details.handler(this.details.identifier, this.page.pagination)
            .pipe(finalize(() => {
                this.isLoading = false;
            }))
            .subscribe((page: Page<UserViewModel>) => {
                this.page.hasMoreItems = page.hasMoreItems;
                this.page.pagination = page.pagination;

                if (page.data) {
                    this.page.data = this.page.data.concat(page.data);
                }
            });
    }

    public modifyRelationship(user: UserViewModel) {
        if (user.isModifyingRelationship) {
            return;
        }

        user.isModifyingRelationship = true;

        const action = this.getRelationshipAction(user.relationship.outgoingStatus);
        this.userService.modifyRelationship(user.id, { action: action })
            .pipe(finalize(() => {
                user.isModifyingRelationship = false;
            }))
            .subscribe((userResponse: UserViewModel) => {
                user.relationship.outgoingStatus = userResponse.relationship.outgoingStatus;
            });
    }

    public getRelationshipAction(outgoingStatus: RelationshipStatus): number {
        if (outgoingStatus === RelationshipStatus.Following) {
            return 1;
        } else if (outgoingStatus === RelationshipStatus.Requested) {
            return 1;
        } else if (outgoingStatus === RelationshipStatus.Blocked) {
            return 4;
        }

        return 0;
    }

    public close() {
        if (!this.isLoading) {
            this.dialogRef.close(this.page);
        } else {
            this.dialogRef.close(null);
        }
    }

    public ngOnDestroy(): void {
        if (this.usersObservableSubscription && !this.usersObservableSubscription.closed) {
            this.usersObservableSubscription.unsubscribe();
        }
    }

    public ngOnInit(): void {
        if (this.details) {
            this.title = this.details.title;
            this.getUsers();
        }

        this.dialogRef.beforeClose().subscribe((page) => {
            if (this.isLoading) {
                this.isLoading = false;
                this.dialogRef.close(null);
            } else {
                this.usersObservableSubscription.unsubscribe();
                this.dialogRef.close(page || this.page);
            }
        });
    }
}
