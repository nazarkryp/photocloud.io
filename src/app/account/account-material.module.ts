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
    MatTooltipModule
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
        MatTooltipModule
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
        MatTooltipModule
    ]
})
export class AccountMaterialModule { }
