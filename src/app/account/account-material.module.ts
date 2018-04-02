import { NgModule } from '@angular/core';

import {
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatTooltipModule,
    MatMenuModule
} from '@angular/material';

@NgModule({
    imports: [
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatExpansionModule,
        MatSlideToggleModule,
        MatGridListModule,
        MatTooltipModule,
        MatMenuModule
    ],
    exports: [
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatExpansionModule,
        MatSlideToggleModule,
        MatGridListModule,
        MatTooltipModule,
        MatMenuModule
    ]
})
export class AccountMaterialModule { }
