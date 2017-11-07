import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AccountMaterialModule } from './account-material.module';

import { SigninComponent } from './signin/signin.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { RecoverComponent } from './recover/recover.component';

import { routes } from './account-routes';

@NgModule({
    imports: [
        CommonModule,
        AccountMaterialModule,
        FlexLayoutModule,
        RouterModule.forChild(routes)
    ],
    declarations: [SigninComponent, CreateComponent, EditComponent, RecoverComponent]
})
export class AccountModule { }
