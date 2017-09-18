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
    MdSlideToggleModule,
    MdAutocompleteModule
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
        MdSlideToggleModule,
        MdAutocompleteModule
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
        MdSlideToggleModule,
        MdAutocompleteModule
    ]
})
export class AppMaterialModule { }
