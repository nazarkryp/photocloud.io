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
    MatGridListModule
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
        MatGridListModule
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
        MatGridListModule
    ]
})
export class AccountMaterialModule { }
