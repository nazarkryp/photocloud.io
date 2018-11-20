import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconRegistry } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app.routing.module';
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

import { StoriesParserComponent } from './utilities/stories/stories-parser.component';

import { AuthenticationGuardService } from './infrastructure/guards/authentication-guard.service';
import { AccountService } from 'app/account/services';

import { ClipboardModule } from 'ngx-clipboard';
import { FileUploadModule } from 'ng2-file-upload';

import { RelationshipActionPipe } from './pipes/relationship-action.pipe';
import { RawPipe } from './pipes/raw.pipe';
import { LinkifyPipe } from './pipes/linkify.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';

import { ErrorBoxComponent } from './components/shared/user-media-error/user-media-error.component';
import { CaptionComponent } from './components/shared/caption/caption.component';
import { TagsComponent } from './components/explore/tags/tags.component';
import { ConfirmComponent } from './components/shared/confirm/confirm.component';
import { UserRequestsComponent } from './components/shared/user-requests/user-requests.component';
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
import { LocalStorageService } from 'app/infrastructure/services/storage';
import { SplashScreenComponent } from './components/shared/splash-screen/splash-screen.component';
import { LikedMediaComponent } from './components/liked-media/liked-media.component';
import { LikesComponent } from './components/shared/likes/likes.component';
import { ChangePasswordComponent } from './components/shared/change-password/change-password.component';
import { TermsComponent } from './components/terms/terms.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { AboutComponent } from './components/about/about.component';
import { CoreModule } from 'app/core';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ActivityPipe } from './pipes/activity.pipe';
import { ActivityComponent } from './components/activity/activity.component';
import { ManageUsersComponent } from './dashboard/components/manage-users/manage-users.component';

import { NgProgressModule } from '@ngx-progressbar/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AttachmentCounterComponent } from './components/shared/attachment-counter/attachment-counter.component';
import { MediaViewComponent } from './components/media-view/media-view.component';
import { CommentBoxComponent } from './components/shared/comment-box/comment-box.component';
import { MediaSettingsComponentComponent } from './components/shared/media-edit-component/media-edit-component.component';
import { LightboxComponent } from './components/shared/lightbox/lightbox.component';
import { PromptModule } from 'app/modules/prompt';

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
        UserRequestsComponent,
        UsersDialogComponent,
        UsersComponent,
        SearchBoxComponent,
        ConnectionErrorComponent,
        UserDetailsComponent,
        FooterComponent,
        SplashScreenComponent,
        LikedMediaComponent,
        LikesComponent,
        ChangePasswordComponent,
        TermsComponent,
        PrivacyComponent,
        AboutComponent,
        LinkifyPipe,
        TimeAgoPipe,
        NotificationsComponent,
        ActivityPipe,
        TruncatePipe,
        ActivityComponent,
        ManageUsersComponent,
        AttachmentCounterComponent,
        MediaViewComponent,
        CommentBoxComponent,
        MediaSettingsComponentComponent,
        LightboxComponent,
        StoriesParserComponent
    ],
    entryComponents: [
        MediaDetailsComponent,
        CreateMediaComponent,
        ConfirmComponent,
        UsersDialogComponent,
        ChangePasswordComponent,
        NotificationsComponent,
        MediaViewComponent,
        LightboxComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AppMaterialModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        ClipboardModule,
        FileUploadModule,
        HttpModule,
        ServiceModule,
        InfrastructureModule,
        SharedModule,
        CoreModule,
        PromptModule,
        NgProgressModule.forRoot(),
        ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
    ],
    providers: [
        AccountService,
        AuthenticationGuardService,
        LocalStorageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(
        private mdIconRegistry: MatIconRegistry,
        private sanitizer: DomSanitizer) {
        mdIconRegistry.addSvgIcon('heart',
            sanitizer.bypassSecurityTrustResourceUrl('assets/svg/icons/heart.svg'));
        mdIconRegistry.addSvgIcon('compass',
            sanitizer.bypassSecurityTrustResourceUrl('assets/svg/icons/compass.svg'));
        mdIconRegistry.addSvgIcon('bell',
            sanitizer.bypassSecurityTrustResourceUrl('assets/svg/icons/bell.svg'));
        mdIconRegistry.addSvgIcon('refresh',
            sanitizer.bypassSecurityTrustResourceUrl('assets/svg/icons/reload.svg'));
        mdIconRegistry.addSvgIcon('comment',
            sanitizer.bypassSecurityTrustResourceUrl('assets/svg/icons/comment.svg'));
        mdIconRegistry.addSvgIcon('share',
            sanitizer.bypassSecurityTrustResourceUrl('assets/svg/icons/share.svg'));
    }
}
