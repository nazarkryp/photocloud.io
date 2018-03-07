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

import { MatBadgeModule } from 'app/core/badge/badge.module';

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
        MatTabsModule,
        MatBadgeModule
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
        MatTabsModule,
        MatBadgeModule
    ]
})
export class AppMaterialModule { }
