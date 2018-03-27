import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { transition, trigger, query, style, stagger, animate } from '@angular/animations';

import { DefaultErrorStateMatcher } from 'app/account/matchers';
import { CurrentUserService } from 'app/infrastructure/services';

import { NgProgress } from 'ngx-progressbar';

@Component({
    selector: 'app-recover',
    templateUrl: './recover.component.html',
    styleUrls: ['./recover.component.css'],
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
export class RecoverComponent implements OnInit {
    @ViewChild('usernameInput') usernameInput: ElementRef;
    @ViewChild('passwordInput') passwordInput: ElementRef;
    public errorStateMatcher = new DefaultErrorStateMatcher();
    public formGroup: FormGroup;
    public recoverError: string;
    public success: boolean;

    public get username(): AbstractControl {
        return this.formGroup.get('username');
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
                    Validators.maxLength(50)]))
        });
    }

    public recover() {
        if (this.formGroup.valid) {
            const username = this.formGroup.get('username').value;

            this.recoverError = null;
            this.progress.start();
            this.formGroup.disable();
            this.currentUserService.recover(username)
                .delay(3000)
                .subscribe(response => {
                    this.success = true;
                    // this.router.navigateByUrl('/');
                    this.progress.done();
                }, error => {
                    this.formGroup.enable();
                    this.recoverError = 'Sorry, user with such username was not found';
                    this.progress.done();
                    this.passwordInput.nativeElement.focus();
                });
        }
    }

    public ngOnInit(): void {
        this.usernameInput.nativeElement.focus();
    }
}
