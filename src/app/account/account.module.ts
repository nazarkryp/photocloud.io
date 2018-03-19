import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AccountMaterialModule } from './account-material.module';
import { SharedModule } from 'app/shared/shared.module';

import { SignInComponent } from './components/signin/signin.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { RecoverComponent } from './components/recover/recover.component';
import { AutoLoginComponent } from './components/auto-login/auto-login.component';

import { routes } from './account-routes';
import { AccountService } from 'app/account/services';
import { UploaderService } from 'app/services';
import { AuthenticationGuardService } from 'app/infrastructure/guards';
import { EditResolver } from 'app/account/services/resolvers';

import { FileUploadModule } from 'ng2-file-upload';
import { PasswordDirective } from './directives/password.directive';

@NgModule({
    imports: [
        CommonModule,
        AccountMaterialModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild(routes),
        FileUploadModule
    ],
    declarations: [
        SignInComponent,
        CreateComponent,
        EditComponent,
        RecoverComponent,
        AutoLoginComponent,
        PasswordDirective
    ],
    providers: [
        AuthenticationGuardService,
        AccountService,
        EditResolver,
        UploaderService
    ]
})
export class AccountModule { }
