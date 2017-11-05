import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconRegistry } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material/app-material.module';

import { AppComponent } from './app.component';
import { PostsComponent } from './components/posts/posts.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PostComponent } from './components/post/post.component';
import { SigninComponent } from './components/signin/signin.component';
import { UserPostsComponent } from './components/user-posts/user-posts.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CommentsComponent } from './components/shared/comments/comments.component';
import { PostDetailsComponent } from './components/shared/post-details/post-details.component';
import { CreatePostComponent } from './components/shared/create-post/create-post.component';

import { AuthenticationGuard } from './infrastructure/guards/authentication-guard.service';
import { CommunicationService, WebApiClient } from './infrastructure/communication';

import { TimeAgoPipe } from 'time-ago-pipe';
import { ClipboardModule } from 'ngx-clipboard';
import { NgProgressModule } from 'ngx-progressbar';
import { FileUploadModule } from 'ng2-file-upload';

import { RelationshipActionPipe } from './pipes/relationship-action.pipe';
import { ErrorBoxComponent } from './components/shared/error-box/error-box.component';
import { RawPipe } from './pipes/raw.pipe';
import { CaptionComponent } from './components/shared/caption/caption.component';
import { ImagePreviewDirective } from './directives/image-preview.directive';
import { SignupComponent } from './components/signup/signup.component';
import { DefaultImageDirective } from './directives/default-image.directive';
import { TagsComponent } from './components/explore/tags/tags.component';
import { ConfirmComponent } from './components/shared/confirm/confirm.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NotificationsComponent } from './components/shared/notifications/notifications.component';
import { UsersComponent } from './components/shared/users/users.component';
import { UserSearchComponent } from './components/explore/user-search/user-search.component';
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

@NgModule({
    declarations: [
        AppComponent,
        PostsComponent,
        NavbarComponent,
        PostComponent,
        TimeAgoPipe,
        SigninComponent,
        UserPostsComponent,
        NotFoundComponent,
        RelationshipActionPipe,
        CommentsComponent,
        ErrorBoxComponent,
        PostDetailsComponent,
        CreatePostComponent,
        RawPipe,
        CaptionComponent,
        ImagePreviewDirective,
        SignupComponent,
        DefaultImageDirective,
        TagsComponent,
        ConfirmComponent,
        SettingsComponent,
        NotificationsComponent,
        UsersComponent,
        UserSearchComponent,
        SearchBoxComponent,
        ConnectionErrorComponent,
        UserDetailsComponent
    ],
    entryComponents: [
        PostDetailsComponent,
        CreatePostComponent,
        ConfirmComponent,
        UsersComponent
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
        InfrastructureModule
    ],
    providers: [
        AuthenticationGuard,
        WebApiClient,
        CommunicationService,
        WebApiClient
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
    }
}
