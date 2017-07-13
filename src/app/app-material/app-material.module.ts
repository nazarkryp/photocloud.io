import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
    MdToolbarModule,
    MdButtonModule,
    MdRippleModule,
    MdCardModule,
    MdIconModule,
    MdTooltipModule,
    MdMenuModule,
    MdInputModule,
    MdProgressBarModule,
    MdDialogModule
} from '@angular/material';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        MdToolbarModule,
        MdButtonModule,
        MdRippleModule,
        MdCardModule,
        MdIconModule,
        MdTooltipModule,
        MdMenuModule,
        MdInputModule,
        MdProgressBarModule,
        MdDialogModule
    ],
    exports: [
        MdToolbarModule,
        MdButtonModule,
        MdRippleModule,
        MdCardModule,
        MdIconModule,
        MdTooltipModule,
        MdMenuModule,
        MdInputModule,
        MdProgressBarModule,
        MdDialogModule
    ]
})
export class AppMaterialModule { }
