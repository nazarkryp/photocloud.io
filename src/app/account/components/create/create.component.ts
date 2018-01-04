import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { trigger, animate, style, transition, animateChild, group, query, stagger } from '@angular/animations';

import { CreateAccountRequestModel } from 'app/account/models/request';
import { AccountService } from 'app/account/services';
import { DefaultErrorStateMatcher } from 'app/account/matchers';
import { ReactiveFormControl } from 'app/account/models/controls';

import { NgProgress } from 'ngx-progressbar';
import { Observable } from 'rxjs/Observable';
import { UserService } from 'app/services';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css'],
    animations: [
        trigger('content', [
            transition(':enter', [
                query('.signup-form', [
                    style({ transform: 'translateX(50px)', opacity: 0 }),
                    stagger(0, [
                        animate('1000ms cubic-bezier(0.35, 0, 0.25, 1)', style('*'))
                    ])
                ])
            ])
        ])
    ]
})
export class CreateComponent {
    public errorStateMatcher = new DefaultErrorStateMatcher();
    public formGroup: FormGroup;

    get username(): ReactiveFormControl {
        return this.formGroup.get('username') as ReactiveFormControl;
    }

    get fullName(): AbstractControl {
        return this.formGroup.get('fullName');
    }

    get email(): ReactiveFormControl {
        return this.formGroup.get('email') as ReactiveFormControl;
    }

    get password(): AbstractControl {
        return this.formGroup.get('password');
    }

    get confirmPassword(): AbstractControl {
        return this.formGroup.get('confirmPassword');
    }

    constructor(
        private router: Router,
        private builder: FormBuilder,
        private accountService: AccountService,
        private userService: UserService,
        private progress: NgProgress) {
        const validator = {
            validator: (e) => {
                return this.validate(e);
            }
        };

        this.formGroup = this.builder.group({
            username: new ReactiveFormControl('',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(50),
                    Validators.minLength(3),
                    Validators.pattern(/^\S*$/)]),
                [this.validateUsername.bind(this)]),
            fullName: new FormControl('',
                Validators.compose([
                    Validators.maxLength(50)])),
            email: new FormControl('',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(50),
                    Validators.pattern(EMAIL_REGEX)]),
                [this.validateUsername.bind(this)]),
            password: new FormControl('',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(50),
                    Validators.minLength(6),
                    Validators.pattern(/^\S*$/)])),
            confirmPassword: new FormControl('',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(50),
                    Validators.minLength(6),
                    Validators.pattern(/^\S*$/)]))
        }, validator);
    }

    public validateUsername(reactiveFormControl: ReactiveFormControl): Promise<{ [key: string]: any; }> | Observable<{ [key: string]: any; }> {
        return reactiveFormControl.valueChanges.debounceTime(500)
            ._do(() => {
                reactiveFormControl.isValidating = true;
            })
            .switchMap(e => {
                return this.userService.checkIfUserExists(reactiveFormControl.value)
                    .map(result => {
                        const error = result ? { 'unique': true } : null;
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

    public createAccount() {
        if (this.formGroup.valid) {
            const createAccountRequestModel = new CreateAccountRequestModel(
                this.formGroup.get('username').value,
                this.formGroup.get('email').value,
                this.formGroup.get('password').value,
                this.formGroup.get('fullName').value
            );

            this.progress.start();
            this.formGroup.disable();
            this.accountService.create(createAccountRequestModel)
                .subscribe(() => {
                    this.progress.done();
                    this.router.navigateByUrl('/account/signin');
                }, errorResponse => {
                    this.progress.done();
                    this.formGroup.enable();
                    this.formGroup.setErrors({
                        'signUpErrors': errorResponse.error.error.modelState
                    });
                    this.progress.done();
                });
        }
    }
}
