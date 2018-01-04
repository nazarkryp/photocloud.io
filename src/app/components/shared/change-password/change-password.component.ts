import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
    public get oldPassword(): AbstractControl {
        return this.passwordFormGroup.get('oldPassword');
    }

    public get password(): AbstractControl {
        return this.passwordFormGroup.get('password');
    }

    public get confirmPassword(): AbstractControl {
        return this.passwordFormGroup.get('confirmPassword');
    }

    public passwordFormGroup: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<ChangePasswordComponent>,
        private builder: FormBuilder) {
        this.configurePasswordForm();
    }

    public close() {
        this.dialogRef.close();
    }

    public ngOnInit() {
    }

    private configurePasswordForm() {
        const validator = {
            validator: (e) => {
                return this.validate(e);
            }
        };

        this.passwordFormGroup = this.builder.group({
            oldPassword: new FormControl('',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(50),
                    Validators.minLength(6),
                    Validators.pattern(/^\S*$/)])),
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
