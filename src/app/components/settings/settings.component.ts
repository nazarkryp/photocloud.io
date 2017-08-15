import { Component, OnInit } from '@angular/core';

import { AccountService } from '../../services';
import { CurrentUser, User } from '../../common/models';

import { NgProgressService } from 'ngx-progressbar';

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
        private accountService: AccountService,
        private progressService: NgProgressService) {
        this.account = new User();
        this.backup = new User();
    }

    private save() {
        this.progressService.start();
        this.accountService.updateAccount(this.account)
            .finally(() => {
                this.progressService.done();
            })
            .subscribe(account => {
                this.account = account;
                this.copyTo(account, this.backup);
            });
    }

    private cancel() {
        this.copyTo(this.account, this.backup);
        this.onAccountChange();
    }

    private onAccountChange() {
        this.isModified = !this.equals(this.account, this.backup);
    }

    private invertAccountPrivateStatus() {
        if (this.isInvertingAccountPrivateStatus) {
            return;
        }

        this.isInvertingAccountPrivateStatus = true;
        this.accountService.updateAccount({
            isPrivate: this.account.isPrivate
        }).finally(() => {
            this.isInvertingAccountPrivateStatus = false;
        }).subscribe(account => {
            this.account.isPrivate = account.isPrivate;
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
            this.account.isActive = account.isActive;
            this.copyTo(account, this.backup);
        });
    }

    private copyTo<T>(source: T, target: T) {
        const properties = Object.getOwnPropertyNames(source);

        properties.forEach(propertyName => {
            target[propertyName] = source[propertyName];
        });
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

    public ngOnInit() {
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
            });
    }
}
