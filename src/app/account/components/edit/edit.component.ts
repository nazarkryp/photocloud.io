import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material';

import { UserProvider } from 'app/infrastructure/providers';
import { AccountService } from 'app/account/services';
import { CurrentUser, User } from 'app/common/models';

import { NgProgress } from 'ngx-progressbar';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
    public account: User;
    public backup: User;
    public isModified: boolean;
    public isInvertingAccountStatus: boolean;
    public isInvertingAccountPrivateStatus: boolean;
    public isLoading: boolean;

    constructor(
        private userProvider: UserProvider,
        private accountService: AccountService,
        private progressService: NgProgress) {
        this.account = new User();
        this.backup = new User();
    }

    public save() {
        this.progressService.start();
        this.accountService.updateAccount(this.backup)
            .finally(() => {
                this.progressService.done();
            })
            .subscribe(account => {
                this.updateAccount(account);
                this.copyTo(this.account, this.backup);
                this.onAccountChange();
            });
    }

    public cancel() {
        this.copyTo(this.account, this.backup);
        this.onAccountChange();
    }

    public onAccountChange() {
        this.isModified = !this.equals(this.account, this.backup);
    }

    public invertAccountPrivateStatus(event: MatSlideToggleChange) {
        if (this.isInvertingAccountPrivateStatus) {
            return;
        }

        this.isInvertingAccountPrivateStatus = true;

        this.accountService.updateAccount({
            isPrivate: event.checked
        }).finally(() => {
            this.isInvertingAccountPrivateStatus = false;
        }).subscribe(account => {
            this.updateAccount({ isPrivate: account.isPrivate });
            this.copyTo(account, this.backup);
        });
    }

    public invertAccountStatus() {
        if (this.isInvertingAccountStatus) {
            return;
        }

        this.isInvertingAccountStatus = true;
        this.accountService.updateAccount({
            isActive: !this.account.isActive
        }).finally(() => {
            this.isInvertingAccountStatus = false;
        }).subscribe(account => {
            this.updateAccount({ isActive: account.isActive });
            this.copyTo(account, this.backup);
        });
    }

    public copyTo<T>(source: T, target: T) {
        const properties = Object.getOwnPropertyNames(source);

        properties.forEach(propertyName => {
            target[propertyName] = source[propertyName];
        });
    }

    public updateAccount(propertiesToUpdate: any) {
        const properties = Object.getOwnPropertyNames(propertiesToUpdate);

        properties.forEach(propertyName => {
            this.account[propertyName] = propertiesToUpdate[propertyName];
        });

        this.userProvider.updateCurrentUser(propertiesToUpdate);
    }

    public equals<T>(source: T, target: T) {
        const properties = Object.getOwnPropertyNames(source);

        let areEqual = true;

        properties.forEach(propertyName => {
            if (target[propertyName] !== source[propertyName]) {
                areEqual = false;
                return;
            }
        });

        return areEqual;
    }

    public getAccountSettings() {
        this.isLoading = true;
        this.progressService.start();
        this.accountService.getAccountSettings()
            .finally(() => {
                this.progressService.done();
                this.isLoading = false;
            })
            .subscribe(account => {
                this.account = account;
                this.copyTo(account, this.backup);
                const currentUser = this.userProvider.getCurrentUser();
                const areEqual = this.equals(account, currentUser);

                if (!areEqual) {
                    this.updateAccount(account);
                }
            });
    }

    public ngOnInit() {
        this.getAccountSettings();
    }
}
