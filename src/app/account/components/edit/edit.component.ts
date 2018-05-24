import { Component, OnInit, AfterViewInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatSlideToggleChange, MatDialog } from '@angular/material';

import { Observable, of } from 'rxjs';
import { map, switchMap, tap, debounceTime, finalize } from 'rxjs/operators';

import { CurrentUserViewModel, AttachmentViewModel } from 'app/models/view';
import { CurrentUserService } from 'app/infrastructure/services';
import { ProgressService } from 'app/shared/services';
import { UserService, UploaderService } from 'app/services';

import { ReactiveFormControl } from 'app/account/models/controls';
import { ChangePasswordComponent } from 'app/components/shared/change-password/change-password.component';

import { FileUploader } from 'ng2-file-upload';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
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

    public uploader: FileUploader;

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
        private uploaderService: UploaderService,
        private progressService: ProgressService) {
        this.uploader = uploaderService.createUploader((attachment) => this.onSuccessUpload(attachment));
        this.configureFormControls();
    }

    public save() {
        const propertiesToUpdate = this.getPropertiesToUpdate();
        this.progressService.start();
        this.currentUserService.updateCurrentUser(propertiesToUpdate)
            .pipe(finalize(() => {
                this.progressService.complete();
            }))
            .subscribe(currentUser => {
                this.setup(currentUser);
            });
    }

    public cancel() {
        this.formGroup.markAsPristine();
        this.formGroup.get('username').setValue(this.backup.username);
        this.formGroup.get('fullName').setValue(this.backup.fullName);
        this.formGroup.get('bio').setValue(this.backup.bio);
    }

    public cancelEmailChange() {
        this.privateFormGroup.markAsPristine();
        this.privateFormGroup.get('email').setValue(this.backup.email);
    }

    public invertAccountPrivateStatus(event: MatSlideToggleChange) {
        if (this.isInvertingAccountPrivateStatus) {
            return;
        }

        this.isInvertingAccountPrivateStatus = true;

        this.currentUserService.updateCurrentUser({
            isPrivate: event.checked
        }).pipe(finalize(() => {
            this.isInvertingAccountPrivateStatus = false;
        })).subscribe(account => {
            this.currentUser.isPrivate = account.isPrivate;
            this.backup.isPrivate = account.isPrivate;
        });
    }

    public invertRememberMe(event: MatSlideToggleChange) {
        this.currentUserService.updateUser({
            isRemembered: event.checked
        });
    }

    public invertAccountAutoLoginStatus(event: MatSlideToggleChange) {
        let observable: Observable<any>;

        if (this.currentUserService.canSignInWithCode) {
            observable = this.currentUserService.disableSignInWithCode();
        } else {
            observable = this.currentUserService.enableSignInWithCode();
        }

        observable.subscribe(() => {
            this.currentUser.canAutoLogin = this.currentUserService.canSignInWithCode;
        }, error => {
            this.currentUser.canAutoLogin = this.currentUserService.canSignInWithCode;
        });
    }

    public invertAccountStatus() {
        if (this.isInvertingAccountStatus) {
            return;
        }

        this.progressService.start();
        this.isInvertingAccountStatus = true;
        this.currentUserService.updateCurrentUser({
            isActive: !this.currentUser.isActive
        }).pipe(finalize(() => {
            this.isInvertingAccountStatus = false;
            this.progressService.complete();
        })).subscribe(account => {
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
        this.currentUser.canAutoLogin = this.currentUserService.canSignInWithCode;

        this.progressService.complete();
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

    public get isUploading(): boolean {
        return this.uploader.isUploading && this.uploader.queue && this.uploader.queue.length > 0;
    }

    public get progress(): number {
        return this.uploader.progress;
    }

    public get progressSpinnerMode(): string {
        if (this.uploader.queue.length && (this.uploader.progress < 1 || this.uploader.progress === 100)) {
            return 'indeterminate';
        }

        return 'determinate';
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
        return reactiveFormControl.valueChanges
            .pipe(debounceTime(500),
                tap(() => {
                    reactiveFormControl.isValidating = true;
                }),
                switchMap(e => {
                    return this.userService.checkIfUserExists(reactiveFormControl.value)
                        .pipe(map(result => {
                            this.currentUser = this.currentUserService.retrieveCurrentUser();
                            const error = (result && this.currentUser.username !== reactiveFormControl.value) ? { 'unique': true } : null;
                            reactiveFormControl.setErrors(error);
                            return of(error);
                        }));
                }),
                tap(() => {
                    reactiveFormControl.isValidating = false;
                }));
    }

    private validateEmail(reactiveFormControl: ReactiveFormControl): Promise<{ [key: string]: any; }> | Observable<{ [key: string]: any; }> {
        return reactiveFormControl.valueChanges
            .pipe(
                debounceTime(500),
                tap(() => {
                    reactiveFormControl.isValidating = true;
                }),
                switchMap(e => {
                    return this.userService.checkIfUserExists(reactiveFormControl.value)
                        .pipe(map(result => {
                            this.currentUser = this.currentUserService.retrieveCurrentUser();
                            const error = (result && this.currentUser.email !== reactiveFormControl.value) ? { 'unique': true } : null;
                            reactiveFormControl.setErrors(error);
                            return of(error);
                        }));
                }),
                tap(() => {
                    reactiveFormControl.isValidating = false;
                })
            );
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

    private onSuccessUpload(attachment: AttachmentViewModel) {
        this.currentUserService.changeAccountAttachment({
            pictureId: attachment.id
        }).pipe(finalize(() => {
            this.uploader.clearQueue();
        })).subscribe(user => {
            this.currentUser.pictureUri = user.pictureUri;
        });
    }
}
