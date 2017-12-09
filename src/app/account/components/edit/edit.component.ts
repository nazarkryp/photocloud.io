import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material';

import { AccountService } from 'app/account/services';
import { CurrentUser } from 'app/common/models';

import { NgProgress } from 'ngx-progressbar';
import { CurrentUserService } from 'app/infrastructure/services';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
    public backup: CurrentUser = new CurrentUser();
    public currentUser: CurrentUser;
    public isInvertingAccountStatus: boolean;
    public isInvertingAccountPrivateStatus: boolean;
    public isActive: boolean;
    public isPrivate: boolean;
    public formGroup: FormGroup;

    constructor(
        private activatedRoute: ActivatedRoute,
        private builder: FormBuilder,
        private currentUserService: CurrentUserService,
        private accountService: AccountService,
        private progress: NgProgress) {

        this.formGroup = this.builder.group({
            username: new FormControl('',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(50),
                    Validators.minLength(3),
                    Validators.pattern(/^\S*$/)])),
            fullName: new FormControl('',
                Validators.compose([
                    Validators.maxLength(50)])),
            bio: new FormControl('',
                Validators.compose([
                    Validators.maxLength(50)])),
            email: new FormControl('',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(50),
                    Validators.pattern(EMAIL_REGEX)])),
        });
    }

    public save() {
        const propertiesToUpdate = this.getPropertiesToUpdate();
        this.progress.start();
        this.accountService.updateAccount(propertiesToUpdate)
            .finally(() => {
                this.progress.done();
            })
            .subscribe(account => {
                this.updateAccount(account);
                this.setup(account);
            });
    }

    public cancel() {
        this.formGroup.markAsPristine();

        this.formGroup.get('username').setValue(this.backup.username);
        this.formGroup.get('fullName').setValue(this.backup.fullName);
        this.formGroup.get('bio').setValue(this.backup.bio);
        this.formGroup.get('email').setValue(this.backup.email);
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
            this.isPrivate = account.isPrivate;
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
            isActive: !this.isActive
        }).finally(() => {
            this.isInvertingAccountStatus = false;
        }).subscribe(account => {
            this.isActive = account.isActive;
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
            const control = this.formGroup.get(propertyName);

            if (control && control.value !== propertiesToUpdate[propertyName]) {
                control.setValue(propertiesToUpdate[propertyName]);
            }
        });

        this.currentUserService.updateCurrentUser(propertiesToUpdate);

        if (!this.isActive) {
            this.formGroup.disable();
        } else {
            this.formGroup.enable();
        }
    }

    public equals<T>(source: T, target: T) {
        const properties = Object.getOwnPropertyNames(source);

        return !properties.some(propertyName => target[propertyName] !== source[propertyName]);
    }

    public ngOnInit() {
        this.currentUser = this.activatedRoute.snapshot.data['account'];
        this.setup(this.currentUser);
        this.currentUserService.getCurrentUser()
            .subscribe(currentUser => {
                const areEqual = this.equals(this.currentUser, currentUser);

                if (!areEqual) {
                    this.updateAccount(this.currentUser);
                }

                this.progress.done();

                this.formGroup.valueChanges.subscribe(e => {
                    if (this.equals(this.backup, e)) {
                        this.formGroup.markAsPristine();
                    }
                });
            });
    }

    private setup(account: CurrentUser) {
        this.backup.username = account.username;
        this.backup.fullName = account.fullName;
        this.backup.bio = account.bio;
        this.backup.email = account.email;

        this.formGroup.get('username').setValue(account.username);
        this.formGroup.get('fullName').setValue(account.fullName);
        this.formGroup.get('bio').setValue(account.bio);
        this.formGroup.get('email').setValue(account.email);

        this.isActive = account.isActive;
        this.isPrivate = account.isPrivate;

        if (account.isActive) {
            this.formGroup.enable();
        } else {
            this.formGroup.disable();
        }
    }

    private getPropertiesToUpdate(): any {
        return {
            username: this.formGroup.get('username').value,
            fullName: this.formGroup.get('fullName').value,
            bio: this.formGroup.get('bio').value,
            email: this.formGroup.get('email').value
        };
    }
}
