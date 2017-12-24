import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material';

import { CurrentUserViewModel } from 'app/models/view';
import { CurrentUserService } from 'app/infrastructure/services';

import { NgProgress } from 'ngx-progressbar';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
    public backup: CurrentUserViewModel = new CurrentUserViewModel();
    public currentUser: CurrentUserViewModel;
    public isInvertingAccountStatus: boolean;
    public isInvertingAccountPrivateStatus: boolean;
    public formGroup: FormGroup;

    constructor(
        private activatedRoute: ActivatedRoute,
        private builder: FormBuilder,
        private currentUserService: CurrentUserService,
        private progress: NgProgress) {
        this.configureFormControls();
    }

    public save() {
        const propertiesToUpdate = this.getPropertiesToUpdate();
        this.progress.start();
        this.currentUserService.updateCurrentUser(propertiesToUpdate)
            .finally(() => {
                this.progress.done();
            })
            .subscribe(currentUser => {
                this.setup(currentUser);
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

        this.currentUserService.updateCurrentUser({
            isPrivate: event.checked
        }).finally(() => {
            this.isInvertingAccountPrivateStatus = false;
        }).subscribe(account => {
            this.currentUser = account;
            this.copyTo(account, this.backup);
        });
    }

    public invertAccountStatus() {
        if (this.isInvertingAccountStatus) {
            return;
        }

        this.isInvertingAccountStatus = true;
        this.currentUserService.updateCurrentUser({
            isActive: !this.currentUser.isActive
        }).finally(() => {
            this.isInvertingAccountStatus = false;
        }).subscribe(account => {
            this.currentUser = account;
            this.copyTo(account, this.backup);
        });
    }

    public copyTo<T>(source: T, target: T) {
        const properties = Object.getOwnPropertyNames(source);

        properties.forEach(propertyName => {
            target[propertyName] = source[propertyName];
        });
    }

    public ngOnInit() {
        this.currentUser = this.activatedRoute.snapshot.data['account'];
        this.setup(this.currentUser);
        this.progress.done();
    }

    private setup(currentUser: CurrentUserViewModel) {
        this.formGroup.markAsPristine();
        this.copyTo(currentUser, this.backup);

        this.formGroup.get('username').setValue(currentUser.username);
        this.formGroup.get('fullName').setValue(currentUser.fullName);
        this.formGroup.get('bio').setValue(currentUser.bio);
        this.formGroup.get('email').setValue(currentUser.email);

        if (currentUser.isActive) {
            this.formGroup.enable();
        } else {
            this.formGroup.disable();
        }
    }

    private compare<T>(source: T, target: T) {
        const properties = Object.getOwnPropertyNames(source);
        return !properties.some(propertyName => target[propertyName] !== source[propertyName]);
    }

    private getPropertiesToUpdate(): any {
        return {
            username: this.formGroup.get('username').value,
            fullName: this.formGroup.get('fullName').value,
            bio: this.formGroup.get('bio').value,
            email: this.formGroup.get('email').value
        };
    }

    private configureFormControls() {
        this.formGroup = this.builder.group({
            username: new FormControl('', Validators.compose([
                Validators.required,
                Validators.maxLength(50),
                Validators.minLength(3),
                Validators.pattern(/^\S*$/)
            ])),
            fullName: new FormControl('', Validators.compose([
                Validators.maxLength(50)
            ])),
            bio: new FormControl('', Validators.compose([
                Validators.maxLength(50)
            ])),
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.maxLength(50),
                Validators.pattern(EMAIL_REGEX)
            ])),
        });
    }
}
