import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { trigger, animate, style, transition, animateChild, group, query, stagger } from '@angular/animations';

import { DefaultErrorStateMatcher } from 'app/account/matchers';
import { LoadingService } from 'app/account/services';
import { CurrentUserService } from 'app/infrastructure/services/current-user.service';
import { CurrentUserViewModel } from 'app/models/view';

@Component({
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css'],
    animations: [
        trigger('content', [
            transition(':enter', [
                query('.signin-form', [
                    style({ transform: 'translateX(25px)', opacity: 0 }),
                    stagger(0, [
                        animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style('*'))
                    ])
                ])
            ])
        ])
    ]
})
export class SignInComponent implements OnInit {
    @ViewChild('passwordInput') passwordInput: ElementRef;
    public errorStateMatcher = new DefaultErrorStateMatcher();
    public formGroup: FormGroup;
    public signInError: string;
    public currentUser: CurrentUserViewModel;
    public tabIndex = 1;

    public get username(): AbstractControl {
        return this.formGroup.get('username');
    }

    public get password(): AbstractControl {
        return this.formGroup.get('password');
    }

    public get rememberMe(): AbstractControl {
        return this.formGroup.get('rememberMe');
    }

    constructor(
        private router: Router,
        private builder: FormBuilder,
        private loadingService: LoadingService,
        private currentUserService: CurrentUserService) {
        this.formGroup = this.builder.group({
            username: new FormControl('',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(50)])),
            password: new FormControl('',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(50)])),
            rememberMe: new FormControl(false)
        });
    }

    public signIn() {
        if (this.formGroup.valid) {
            this.signInError = null;
            this.startLoading();
            this.currentUserService.signIn(this.username.value, this.password.value, this.rememberMe.value)
                .finally(() => {
                    this.finishLoading();
                })
                .subscribe(response => {
                    this.router.navigateByUrl('/');
                }, error => {
                    this.passwordInput.nativeElement.focus();
                    this.signInError = 'Sorry, your username or password was incorrect. Please check your username and password';
                });
        }
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

    public clearCurrentUser() {
        this.currentUser = null;
        this.username.setValue('');
        this.rememberMe.setValue(false);
    }

    public ngOnInit(): void {
        this.currentUser = this.currentUserService.retrieveCurrentUser();

        if (this.currentUser) {
            this.username.setValue(this.currentUser.username);
            this.rememberMe.setValue(true);
        }
    }
}

