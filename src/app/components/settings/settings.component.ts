import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material';

import { UserProvider } from '../../infrastructure/providers';
import { AccountService } from '../../services';
import { CurrentUser, User } from '../../common/models';

import { NgProgress } from 'ngx-progressbar';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    private account: User;
    private backup: User;
    private isModified: boolean;
    private isInvertingAccountStatus: boolean;
    private isInvertingAccountPrivateStatus: boolean;
    private isLoading: boolean;

    constructor(
        private userProvider: UserProvider,
        private accountService: AccountService,
        private progressService: NgProgress) {
        this.account = new User();
        this.backup = new User();
    }

    private save() {
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

    private cancel() {
        this.copyTo(this.account, this.backup);
        this.onAccountChange();
    }

    private onAccountChange() {
        this.isModified = !this.equals(this.account, this.backup);
    }

    private invertAccountPrivateStatus(event: MatSlideToggleChange) {
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

    private invertAccountStatus() {
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

    private copyTo<T>(source: T, target: T) {
        const properties = Object.getOwnPropertyNames(source);

        properties.forEach(propertyName => {
            target[propertyName] = source[propertyName];
        });
    }

    private updateAccount(propertiesToUpdate: any) {
        const properties = Object.getOwnPropertyNames(propertiesToUpdate);

        properties.forEach(propertyName => {
            this.account[propertyName] = propertiesToUpdate[propertyName];
        });

        this.userProvider.updateCurrentUser(propertiesToUpdate);
    }

    private equals<T>(source: T, target: T) {
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

    private getAccountSettings() {
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
