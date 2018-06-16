import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs';

import { PromptModule } from '../prompt.module';
import { PromptComponent } from '../components/prompt/prompt.component';
import { Prompt } from '../models/prompt';

@Injectable({
    providedIn: PromptModule
})
export class PromptService {
    constructor(
        private dialog: MatDialog) { }

    public prompt(prompt: Prompt): Observable<any> {
        return this.dialog.open(PromptComponent, {
            width: '420px',
            autoFocus: false,
            data: prompt
        }).afterClosed();
    }
}
