import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AccountMaterialModule } from './account-material.module';
import { SharedModule } from 'app/shared/shared.module';

import { SignInComponent } from './components/signin/signin.component';
import { CreateComponent } from './components/create/create.component';
import { SettingsComponent } from './components/settings/settings.component';
import { RecoverComponent } from './components/recover/recover.component';
import { AutoLoginComponent } from './components/auto-login/auto-login.component';

import { AccountRoutes } from './account.routes';
import { AccountService } from 'app/account/services';
import { UploaderService } from 'app/services';
import { AuthenticationGuardService } from 'app/infrastructure/guards';
import { EditResolver } from 'app/account/services/resolvers';

import { FileUploadModule } from 'ng2-file-upload';
import { PasswordDirective } from './directives/password.directive';
import { AccountComponent } from './components/account/account.component';
import { LoadingService } from './services/loading.service';

@NgModule({
    imports: [
        CommonModule,
        AccountMaterialModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild(AccountRoutes),
        FileUploadModule
    ],
    declarations: [
        SignInComponent,
        CreateComponent,
        SettingsComponent,
        RecoverComponent,
        AutoLoginComponent,
        PasswordDirective,
        AccountComponent
    ],
    providers: [
        AuthenticationGuardService,
        AccountService,
        EditResolver,
        UploaderService,
        LoadingService
    ]
})
export class AccountModule { }
