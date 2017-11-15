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
    MatSlideToggleModule
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
        MatSlideToggleModule
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
        MatSlideToggleModule
    ]
})
export class AccountMaterialModule { }
