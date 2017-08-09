import { Component, Inject } from '@angular/core';
import { MdDialogRef, MdSnackBarConfig, MdSnackBar, MD_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {
    private message: string;
    private title: string;

    constructor(
        public dialogRef: MdDialogRef<ConfirmComponent>,
        @Inject(MD_DIALOG_DATA) public content: any) {
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
