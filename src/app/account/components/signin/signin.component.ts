import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { trigger, animate, style, transition, animateChild, group, query, stagger } from '@angular/animations';

import { AccountService } from 'app/account/services';
import { DefaultErrorStateMatcher } from 'app/account/matchers';
import { NgProgress } from 'ngx-progressbar';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css'],
    animations: [
        trigger('content', [
            transition(':enter', [
                query('.signin-form', [
                    style({ transform: 'translateX(200px)', opacity: 0 }),
                    stagger(0, [
                        animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style('*'))
                    ])
                ])
            ])
        ])
    ]
})
export class SignInComponent {
    @ViewChild('usernameInput') usernameInput: ElementRef;
    public errorStateMatcher = new DefaultErrorStateMatcher();
    public formGroup: FormGroup;
    public isLoading: boolean;

    get username(): AbstractControl {
        return this.formGroup.get('username');
    }

    get password(): AbstractControl {
        return this.formGroup.get('password');
    }

    constructor(
        private router: Router,
        private builder: FormBuilder,
        private progress: NgProgress,
        private accountService: AccountService) {
        this.formGroup = this.builder.group({
            username: new FormControl('',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(50),
                    Validators.minLength(3),
                    Validators.pattern(/^\S*$/)])),
            password: new FormControl('',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(50),
                    Validators.minLength(6),
                    Validators.pattern(/^\S*$/)]))
        });
    }

    public signIn(username: string, password: string) {
        if (this.formGroup.valid) {
            this.progress.start();
            this.formGroup.disable();
            this.accountService.signIn(username, password)
                .subscribe(response => {
                    this.router.navigateByUrl('/');
                }, error => {
                    this.formGroup.enable();
                    this.formGroup.setErrors({
                        'signInError':
                            'Sorry, your username or password was incorrect. Please check your username and password'
                    });
                    this.progress.done();
                    this.usernameInput.nativeElement.focus();
                });
        }
    }
}
