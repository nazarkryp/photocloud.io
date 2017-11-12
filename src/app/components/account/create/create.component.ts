import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { AccountService } from '../services/account.service';
import { DefaultErrorStateMatcher } from 'app/components/account/matchers';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
    public errorStateMatcher = new DefaultErrorStateMatcher();
    public formGroup: FormGroup;

    get username(): AbstractControl {
        return this.formGroup.get('username');
    }

    get fullName(): AbstractControl {
        return this.formGroup.get('fullName');
    }

    get email(): AbstractControl {
        return this.formGroup.get('email');
    }

    get password(): AbstractControl {
        return this.formGroup.get('password');
    }

    get confirmPassword(): AbstractControl {
        return this.formGroup.get('confirmPassword');
    }

    constructor(
        private builder: FormBuilder) {
        this.formGroup = this.builder.group({
            username: new FormControl('',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(50),
                    Validators.minLength(3),
                    Validators.pattern(/^\S*$/)])),
            fullName: new FormControl('',
                Validators.compose([
                    Validators.maxLength(50)])),
            email: new FormControl('',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(50),
                    Validators.pattern(EMAIL_REGEX)])),
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
        });
    }

    public signIn() {
        if (this.formGroup.valid) {
            console.log('success');
        }
    }

    public error(obj: any) {
        console.log(obj);
    }

    public ngOnInit() {
    }
}
