import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconRegistry } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material/app-material.module';
import { SharedModule } from 'app/shared/shared.module';

import { AppComponent } from './app.component';
import { MediaComponent } from './components/media/media.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MediaItemComponent } from './components/media-item/media-item.component';
import { UserMediaComponent } from './components/user-media/user-media.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CommentsComponent } from './components/shared/comments/comments.component';
import { MediaDetailsComponent } from './components/shared/media-details/media-details.component';
import { CreateMediaComponent } from './components/shared/create-media/create-media.component';

import { AuthenticationGuardService } from './infrastructure/guards/authentication-guard.service';
import { AccountService } from 'app/account/services';

import { ClipboardModule } from 'ngx-clipboard';
import { NgProgressModule } from 'ngx-progressbar';
import { FileUploadModule } from 'ng2-file-upload';

import { RelationshipActionPipe } from './pipes/relationship-action.pipe';
import { RawPipe } from './pipes/raw.pipe';

import { ErrorBoxComponent } from './components/shared/user-media-error/user-media-error.component';
import { CaptionComponent } from './components/shared/caption/caption.component';
import { TagsComponent } from './components/explore/tags/tags.component';
import { ConfirmComponent } from './components/shared/confirm/confirm.component';
import { NotificationsComponent } from './components/shared/notifications/notifications.component';
import { UsersDialogComponent } from './components/shared/users-dialog/users-dialog.component';
import { UsersComponent } from './components/explore/users/users.component';
import { SearchBoxComponent } from './components/shared/search-box/search-box.component';
import { ConnectionErrorComponent } from './components/shared/connection-error/connection-error.component';

import { InfrastructureModule } from 'app/infrastructure';
import { ServiceModule } from './services/service.module';

import {
    HttpErrorFilter,
    HttpNotFoundFilter,
    AccountNotActiveFilter,
    InternetConnectionFilter,
    AuthenticationErrorFilter
} from './infrastructure/filters/http';
import { UserDetailsComponent } from './components/shared/user-details/user-details.component';
import { FooterComponent } from './components/footer/footer.component';
import { WebApiClient } from 'app/infrastructure/communication';
import { LocalStorageService } from 'app/infrastructure/services/storage';
import { SplashScreenComponent } from './components/shared/splash-screen/splash-screen.component';
import { CovalentModule } from 'app/core/covalent.module';
import { LikedMediaComponent } from './components/liked-media/liked-media.component';
import { LikesComponent } from './components/shared/likes/likes.component';
import { ChangePasswordComponent } from './components/shared/change-password/change-password.component';

@NgModule({
    declarations: [
        AppComponent,
        MediaComponent,
        ToolbarComponent,
        MediaItemComponent,
        UserMediaComponent,
        NotFoundComponent,
        RelationshipActionPipe,
        CommentsComponent,
        ErrorBoxComponent,
        MediaDetailsComponent,
        CreateMediaComponent,
        RawPipe,
        CaptionComponent,
        TagsComponent,
        ConfirmComponent,
        NotificationsComponent,
        UsersDialogComponent,
        UsersComponent,
        SearchBoxComponent,
        ConnectionErrorComponent,
        UserDetailsComponent,
        FooterComponent,
        SplashScreenComponent,
        LikedMediaComponent,
        LikesComponent,
        ChangePasswordComponent
    ],
    entryComponents: [
        MediaDetailsComponent,
        CreateMediaComponent,
        ConfirmComponent,
        UsersDialogComponent,
        ChangePasswordComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AppMaterialModule,
        FlexLayoutModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgProgressModule,
        ClipboardModule,
        FileUploadModule,
        HttpModule,
        ServiceModule,
        InfrastructureModule,
        CovalentModule,
        SharedModule
    ],
    providers: [
        AccountService,
        AuthenticationGuardService,
        WebApiClient,
        LocalStorageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(
        private mdIconRegistry: MatIconRegistry,
        private sanitizer: DomSanitizer) {
        mdIconRegistry.addSvgIcon('heart', sanitizer.bypassSecurityTrustResourceUrl('assets/svg/icons/heart.svg'));
        mdIconRegistry.addSvgIcon('compass', sanitizer.bypassSecurityTrustResourceUrl('assets/svg/icons/compass.svg'));
        mdIconRegistry.addSvgIcon('bell', sanitizer.bypassSecurityTrustResourceUrl('assets/svg/icons/bell.svg'));
        mdIconRegistry.addSvgIcon('refresh', sanitizer.bypassSecurityTrustResourceUrl('assets/svg/icons/refresh.svg'));
        mdIconRegistry.addSvgIcon('comment', sanitizer.bypassSecurityTrustResourceUrl('assets/svg/icons/comment.svg'));
        mdIconRegistry.addSvgIcon('share', sanitizer.bypassSecurityTrustResourceUrl('assets/svg/icons/share.svg'));
    }
}
