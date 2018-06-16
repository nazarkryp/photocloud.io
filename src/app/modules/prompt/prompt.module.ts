import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PromptComponent } from './components/prompt/prompt.component';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        FlexLayoutModule
    ],
    entryComponents: [
        PromptComponent
    ],
    declarations: [
        PromptComponent
    ],
    exports: [
        PromptComponent
    ]
})
export class PromptModule { }
