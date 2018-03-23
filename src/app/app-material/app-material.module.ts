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
    MatDividerModule,
    MatTabsModule
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
        MatDividerModule,
        MatTabsModule
    ],
    exports: [
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
        MatDividerModule,
        MatTabsModule
    ]
})
export class AppMaterialModule { }
