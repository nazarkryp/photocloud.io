import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AccountMaterialModule } from './account-material.module';

import { SignInComponent } from './signin/signin.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { RecoverComponent } from './recover/recover.component';

import { routes } from './account-routes';

import { AuthenticationGuard } from 'app/infrastructure/guards';

import { AccountService } from 'app/services';

@NgModule({
    imports: [
        CommonModule,
        AccountMaterialModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        SignInComponent,
        CreateComponent,
        EditComponent,
        RecoverComponent
    ],
    providers: [
        AuthenticationGuard,
        AccountService
    ]
})
export class AccountModule { }
