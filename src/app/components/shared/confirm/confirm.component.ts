import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBarConfig, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {
    private message: string;
    private title: string;

    constructor(
        public dialogRef: MatDialogRef<ConfirmComponent>,
        @Inject(MAT_DIALOG_DATA) public content: any) {
            this.title = this.content.title;
            this.message = this.content.message;
    }

    private confirm() {
        this.dialogRef.close(true);
    }

    private cancel() {
        this.dialogRef.close(false);
    }
}
