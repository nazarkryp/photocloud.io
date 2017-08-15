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
    MdProgressSpinnerModule,
    MdDialogModule,
    MdSnackBarModule,
    MdSidenavModule,
    MdSlideToggleModule
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
        MdProgressSpinnerModule,
        MdDialogModule,
        MdSnackBarModule,
        MdSidenavModule,
        MdSlideToggleModule
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
        MdProgressSpinnerModule,
        MdDialogModule,
        MdSnackBarModule,
        MdSidenavModule,
        MdSlideToggleModule
    ]
})
export class AppMaterialModule { }
