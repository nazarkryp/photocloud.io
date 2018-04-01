import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MatSnackBarConfig, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {
    constructor(
        public dialogRef: MatDialogRef<ConfirmComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    public confirm() {
        this.dialogRef.close(true);
    }

    public cancel() {
        this.dialogRef.close(false);
    }
}
