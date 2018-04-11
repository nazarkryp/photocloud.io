import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { trigger, animate, style, transition, animateChild, group, query, stagger } from '@angular/animations';

import { Observable } from 'rxjs/Observable';

import { AccountService, LoadingService } from 'app/account/services';
import { DefaultErrorStateMatcher } from 'app/account/matchers';
import { ReactiveFormControl } from 'app/account/models/controls';
import { CreateAccountRequestModel } from 'app/account/models/request';

import { CurrentUserService } from 'app/infrastructure/services';
import { UserService } from 'app/services';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css'],
    animations: [
        trigger('content', [
            transition(':enter', [
                query('.form', [
                    style({ transform: 'translateX(25px)', opacity: 0 }),
                    stagger(0, [
                        animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style('*'))
                    ])
                ])
            ])
        ])
    ]
})
export class CreateComponent {
    public formGroup: FormGroup;
    public errorStateMatcher = new DefaultErrorStateMatcher();
    public signUpError: string;
    public tabIndex = 1;

    public get username(): ReactiveFormControl {
        return this.formGroup.get('username') as ReactiveFormControl;
    }

    public get fullName(): AbstractControl {
        return this.formGroup.get('fullName');
    }

    public get email(): ReactiveFormControl {
        return this.formGroup.get('email') as ReactiveFormControl;
    }

    public get password(): AbstractControl {
        return this.formGroup.get('password');
    }

    public get confirmPassword(): AbstractControl {
        return this.formGroup.get('confirmPassword');
    }

    constructor(
        private router: Router,
        private builder: FormBuilder,
        private currentUserService: CurrentUserService,
        private loadingService: LoadingService,
        private userService: UserService) {
        this.formGroup = this.builder.group({
            username: new ReactiveFormControl('',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(50),
                    Validators.minLength(3),
                    Validators.pattern(/^[a-z0-9]+$/i)]),
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
                    Validators.pattern(/^\S*$/)]))
        });
    }

    private startLoading() {
        this.formGroup.disable();
        this.loadingService.start();
        this.tabIndex = -1;
    }

    private finishLoading() {
        this.formGroup.enable();
        this.loadingService.done();
        this.tabIndex = 1;
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

    public createAccount() {
        if (this.formGroup.valid) {
            this.signUpError = null;

            const createAccountRequestModel = new CreateAccountRequestModel(
                this.username.value,
                this.email.value,
                this.password.value
            );

            this.startLoading();
            this.currentUserService.create(createAccountRequestModel)
                .subscribe(() => {
                    if (createAccountRequestModel.signInOnCreated) {
                        this.router.navigateByUrl('/');
                    } else {
                        this.router.navigateByUrl('/account/signin');
                    }
                }, (errorResponse) => {
                    this.finishLoading();
                    this.signUpError = errorResponse.error.error.modelState;
                });
        }
    }
}
