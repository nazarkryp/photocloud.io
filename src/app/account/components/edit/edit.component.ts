import { Component, OnInit, AfterViewInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material';

import { CurrentUserViewModel } from 'app/models/view';
import { CurrentUserService } from 'app/infrastructure/services';

import { NgProgress } from 'ngx-progressbar';
import { ReactiveFormControl } from 'app/account/models/controls';
import { Observable } from 'rxjs/Observable';
import { UserService } from 'app/services';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, AfterViewInit, AfterViewChecked {
    public backup: CurrentUserViewModel = new CurrentUserViewModel();
    public currentUser: CurrentUserViewModel;
    public isInvertingAccountStatus: boolean;
    public isInvertingAccountPrivateStatus: boolean;
    public formGroup: FormGroup;

    get username(): ReactiveFormControl {
        return this.formGroup.get('username') as ReactiveFormControl;
    }

    get email(): ReactiveFormControl {
        return this.formGroup.get('email') as ReactiveFormControl;
    }

    constructor(
        private cd: ChangeDetectorRef,
        private activatedRoute: ActivatedRoute,
        private builder: FormBuilder,
        private userService: UserService,
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
            this.currentUser.isPrivate = account.isPrivate;
            this.backup.isPrivate = account.isPrivate;
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
            this.currentUser.pictureUri = account.pictureUri;
            this.currentUser.isActive = account.isActive;
            this.backup.isActive = account.isActive;
            this.refreshFormControls();
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

        this.progress.done();
    }

    private setup(currentUser: CurrentUserViewModel) {
        this.formGroup.markAsPristine();
        this.copyTo(currentUser, this.backup);

        this.formGroup.get('username').setValue(currentUser.username);
        this.formGroup.get('fullName').setValue(currentUser.fullName);
        this.formGroup.get('bio').setValue(currentUser.bio);
        this.formGroup.get('email').setValue(currentUser.email);

        this.refreshFormControls();
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
            username: new ReactiveFormControl('',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(50),
                    Validators.minLength(3),
                    Validators.pattern(/^\S*$/)]),
                [this.validateUsername.bind(this)]),
            fullName: new FormControl('', Validators.compose([
                Validators.maxLength(50)
            ])),
            bio: new FormControl('', Validators.compose([
                Validators.maxLength(50)
            ])),
            email: new FormControl('',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(50),
                    Validators.pattern(EMAIL_REGEX)]),
                [this.validateEmail.bind(this)])
        });
    }

    private refreshFormControls() {
        if (this.currentUser.isActive) {
            this.formGroup.enable();
        } else {
            this.formGroup.disable();
        }
    }

    public validateUsername(reactiveFormControl: ReactiveFormControl): Promise<{ [key: string]: any; }> | Observable<{ [key: string]: any; }> {
        return reactiveFormControl.valueChanges.debounceTime(500)
            ._do(() => {
                reactiveFormControl.isValidating = true;
            })
            .switchMap(e => {
                return this.userService.checkIfUserExists(reactiveFormControl.value)
                    .map(result => {
                        const error = (result && this.currentUser.username !== reactiveFormControl.value) ? { 'unique': true } : null;
                        reactiveFormControl.setErrors(error);
                        return Observable.of(error);
                    });
            })
            ._do(() => {
                reactiveFormControl.isValidating = false;
            });
    }

    public validateEmail(reactiveFormControl: ReactiveFormControl): Promise<{ [key: string]: any; }> | Observable<{ [key: string]: any; }> {
        return reactiveFormControl.valueChanges.debounceTime(500)
            ._do(() => {
                reactiveFormControl.isValidating = true;
            })
            .switchMap(e => {
                return this.userService.checkIfUserExists(reactiveFormControl.value)
                    .map(result => {
                        const error = (result && this.currentUser.email !== reactiveFormControl.value) ? { 'unique': true } : null;
                        reactiveFormControl.setErrors(error);
                        return Observable.of(error);
                    });
            })
            ._do(() => {
                reactiveFormControl.isValidating = false;
            });
    }

    public ngAfterViewInit(): void {
        this.setup(this.currentUser);
    }

    public ngAfterViewChecked(): void {
        this.cd.detectChanges();
    }
}
