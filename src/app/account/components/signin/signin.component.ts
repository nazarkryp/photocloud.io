import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { trigger, animate, style, transition, animateChild, group, query, stagger } from '@angular/animations';

import { DefaultErrorStateMatcher } from 'app/account/matchers';
import { NgProgress } from 'ngx-progressbar';
import { CurrentUserService } from 'app/infrastructure/services/current-user.service';

@Component({
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css'],
    animations: [
        trigger('content', [
            transition(':enter', [
                query('.signin-form', [
                    style({ transform: 'translateX(50px)', opacity: 0 }),
                    stagger(0, [
                        animate('1000ms cubic-bezier(0.35, 0, 0.25, 1)', style('*'))
                    ])
                ])
            ])
        ])
    ]
})
export class SignInComponent {
    @ViewChild('passwordInput') passwordInput: ElementRef;
    public errorStateMatcher = new DefaultErrorStateMatcher();
    public formGroup: FormGroup;
    public signInError: string;

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
        private currentUserService: CurrentUserService) {
        this.formGroup = this.builder.group({
            username: new FormControl('',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(50)])),
            password: new FormControl('',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(50)]))
        });
    }

    public signIn() {
        if (this.formGroup.valid) {
            this.signInError = null;
            this.progress.start();
            this.formGroup.disable();
            this.currentUserService.signIn(this.username.value, this.password.value)
                .subscribe(response => {
                    this.router.navigateByUrl('/');
                }, error => {
                    this.formGroup.enable();
                    this.signInError = 'Sorry, your username or password was incorrect. Please check your username and password';
                    this.progress.done();
                    this.passwordInput.nativeElement.focus();
                });
        }
    }
}

