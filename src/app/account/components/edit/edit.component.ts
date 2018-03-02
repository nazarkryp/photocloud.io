import { Component, OnInit, AfterViewInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatSlideToggleChange, MatDialog } from '@angular/material';

import { CurrentUserViewModel } from 'app/models/view';
import { CurrentUserService } from 'app/infrastructure/services';

import { NgProgress } from 'ngx-progressbar';
import { ReactiveFormControl } from 'app/account/models/controls';
import { Observable } from 'rxjs/Observable';
import { UserService } from 'app/services';
import { ChangePasswordComponent } from 'app/components/shared/change-password/change-password.component';

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
    public privateFormGroup: FormGroup;
    public passwordFormGroup: FormGroup;

    public get username(): ReactiveFormControl {
        return this.formGroup.get('username') as ReactiveFormControl;
    }

    public get email(): ReactiveFormControl {
        return this.privateFormGroup.get('email') as ReactiveFormControl;
    }

    public get oldPassword(): AbstractControl {
        return this.passwordFormGroup.get('oldPassword');
    }

    public get password(): AbstractControl {
        return this.passwordFormGroup.get('password');
    }

    public get confirmPassword(): AbstractControl {
        return this.passwordFormGroup.get('confirmPassword');
    }

    constructor(
        private dialog: MatDialog,
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
        this.privateFormGroup.get('email').setValue(this.backup.email);
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

        this.progress.start();
        this.isInvertingAccountStatus = true;
        this.currentUserService.updateCurrentUser({
            isActive: !this.currentUser.isActive
        }).finally(() => {
            this.isInvertingAccountStatus = false;
            this.progress.done();
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

    public ngAfterViewInit(): void {
        this.setup(this.currentUser);
    }

    public ngAfterViewChecked(): void {
        this.cd.detectChanges();
    }

    public changePassword() {
        this.dialog.open(ChangePasswordComponent, {
            width: '500px'
        });
    }

    private setup(currentUser: CurrentUserViewModel) {
        this.formGroup.markAsPristine();
        this.copyTo(currentUser, this.backup);

        this.formGroup.get('username').setValue(currentUser.username);
        this.formGroup.get('fullName').setValue(currentUser.fullName);
        this.formGroup.get('bio').setValue(currentUser.bio);
        this.privateFormGroup.get('email').setValue(currentUser.email);

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
            email: this.privateFormGroup.get('email').value
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
            fullName: new FormControl('', Validators.compose([Validators.maxLength(50)])),
            bio: new FormControl('', Validators.compose([Validators.maxLength(250)]))
        });

        this.privateFormGroup = this.builder.group({
            email: new ReactiveFormControl('',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(50),
                    Validators.pattern(EMAIL_REGEX)]),
                [this.validateEmail.bind(this)])
        });

        const validator = {
            validator: (e) => {
                return this.validate(e);
            }
        };

        this.passwordFormGroup = this.builder.group({
            oldPassword: new FormControl('',
                Validators.compose([
                    Validators.maxLength(50),
                    Validators.minLength(6),
                    Validators.pattern(/^\S*$/)])),
            password: new FormControl('',
                Validators.compose([
                    Validators.maxLength(50),
                    Validators.minLength(6),
                    Validators.pattern(/^\S*$/)])),
            confirmPassword: new FormControl('',
                Validators.compose([
                    Validators.maxLength(50),
                    Validators.minLength(6),
                    Validators.pattern(/^\S*$/)]))
        }, validator);
    }

    private refreshFormControls() {
        if (this.currentUser.isActive) {
            this.formGroup.enable();
            this.privateFormGroup.enable();
            this.passwordFormGroup.enable();
        } else {
            this.formGroup.disable();
            this.privateFormGroup.disable();
            this.passwordFormGroup.disable();
        }
    }

    private validateUsername(reactiveFormControl: ReactiveFormControl): Promise<{ [key: string]: any; }> | Observable<{ [key: string]: any; }> {
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

    private validateEmail(reactiveFormControl: ReactiveFormControl): Promise<{ [key: string]: any; }> | Observable<{ [key: string]: any; }> {
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

    private validate(formGroup: FormGroup) {
        const confirmPasswordErrors = formGroup.get('password').value !== formGroup.get('confirmPassword').value
            ? { 'mismatch': true }
            : null;

        const confirmPassword = formGroup.get('confirmPassword');
        if (confirmPasswordErrors && confirmPasswordErrors.mismatch) {
            confirmPassword.setErrors(confirmPasswordErrors);
        } else if (confirmPassword.errors) {
            delete confirmPassword.errors['mismatch'];
            if (!Object.keys(confirmPassword.errors).length) {
                confirmPassword.setErrors(null);
            }
        }
    }
}
