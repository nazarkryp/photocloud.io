import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Prompt } from '../../models/prompt';

@Component({
    selector: 'app-prompt',
    templateUrl: './prompt.component.html',
    styleUrls: ['./prompt.component.css']
})
export class PromptComponent {
    constructor(
        private dialogRef: MatDialogRef<PromptComponent>,
        @Inject(MAT_DIALOG_DATA) public prompt: Prompt) {
        this.dialogRef.beforeClose().subscribe(result => {
            if (result === undefined) {
                this.dialogRef.close(false);
            }
        });
    }

    public submit() {
        this.dialogRef.close(true);
    }

    public cancel() {
        this.dialogRef.close(false);
    }
}
