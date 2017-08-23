import { Component, OnInit, OnDestroy, Optional, Inject } from '@angular/core';
import { MdDialogRef, MdSnackBarConfig, MdSnackBar, MD_DIALOG_DATA } from '@angular/material';
import { Observable, Subscription } from 'rxjs/Rx';

import { User } from '../../../common/models';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
    private users: User[];
    private usersObservableSubscription: Subscription;

    constructor(
        public dialogRef: MdDialogRef<UsersComponent>,
        @Inject(MD_DIALOG_DATA) private usersObservable: Observable<User[]>) {
        this.usersObservableSubscription = this.usersObservable.subscribe(users => {
            this.users = users;
        });
    }

    public ngOnInit() {
    }

    public ngOnDestroy(): void {
        this.usersObservableSubscription.unsubscribe();
    }
}
