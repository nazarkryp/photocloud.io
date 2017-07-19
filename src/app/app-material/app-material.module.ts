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
    MdDialogModule,
    MdSnackBarModule,
    MdSidenavModule
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
        MdDialogModule,
        MdSnackBarModule,
        MdSidenavModule
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
        MdDialogModule,
        MdSnackBarModule,
        MdSidenavModule
    ]
})
export class AppMaterialModule { }
