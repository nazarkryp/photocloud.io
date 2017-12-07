import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AccountMaterialModule } from './account-material.module';

import { SignInComponent } from './components/signin/signin.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { RecoverComponent } from './components/recover/recover.component';

import { routes } from './account-routes';
import { AccountService } from 'app/account/services';
import { AuthenticationGuardService } from 'app/infrastructure/guards';
import { EditResolver } from 'app/account/services/resolvers';

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
        AuthenticationGuardService,
        AccountService,
        EditResolver
    ]
})
export class AccountModule { }
