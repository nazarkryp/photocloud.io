import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
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
    MatTabsModule,
    MatListModule
} from '@angular/material';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatButtonToggleModule,
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
        MatTabsModule,
        MatListModule
    ],
    exports: [
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatButtonToggleModule,
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
        MatTabsModule,
        MatListModule
    ]
})
export class AppMaterialModule { }
