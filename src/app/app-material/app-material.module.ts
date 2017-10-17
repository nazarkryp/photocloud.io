import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
    MatToolbarModule,
    MatButtonModule,
    MatRippleModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatExpansionModule
} from '@angular/material';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatRippleModule,
        MatCardModule,
        MatIconModule,
        MatTooltipModule,
        MatMenuModule,
        MatInputModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatSnackBarModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatAutocompleteModule,
        MatExpansionModule
    ],
    exports: [
        MatToolbarModule,
        MatButtonModule,
        MatRippleModule,
        MatCardModule,
        MatIconModule,
        MatTooltipModule,
        MatMenuModule,
        MatInputModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatSnackBarModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatAutocompleteModule,
        MatExpansionModule
    ]
})
export class AppMaterialModule { }
