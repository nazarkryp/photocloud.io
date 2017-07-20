import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

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

import { PostService } from './services/post.service';
import { CommentService } from './services/comment.service';
import { UserService } from './services/user.service';
import { AccountService } from './services/account.service';

import { CurrentUserService } from './infrastructure/services/current-user.service';
import { AuthenticationGuard } from './infrastructure/guards/authentication-guard.service';
import { SessionService } from './infrastructure/session/session.service';
import { TokenService } from './infrastructure/security/token.service';
import { WebApiClient } from './infrastructure/communication/http';
import { CommunicationService } from './infrastructure/communication/communication.service';
import { ClipboardService } from './infrastructure/services/clipboard.service';

import { TokenMapper } from './infrastructure/mapping/token.mapper';
import { UserMapper } from './infrastructure/mapping/user.mapper';

import { TimeAgoPipe } from 'time-ago-pipe';
import { ClipboardModule } from 'ngx-clipboard';
import { NgProgressModule } from 'ngx-progressbar';
import { FileUploadModule } from 'ng2-file-upload';

import { RelationshipActionPipe } from './pipes/relationship-action.pipe';
import { ErrorBoxComponent } from './components/shared/error-box/error-box.component';
import { RawPipe } from './pipes/raw.pipe';
import { CaptionComponent } from './components/shared/caption/caption.component';
import { ImagePreviewDirective } from './directives/image-preview.directive';

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
        ImagePreviewDirective
    ],
    entryComponents: [
        PostDetailsComponent,
        CreatePostComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AppMaterialModule,
        FlexLayoutModule,
        HttpClientModule,
        FormsModule,
        NgProgressModule,
        ClipboardModule,
        FileUploadModule
    ],
    providers: [
        PostService,
        CommentService,
        UserService,
        AccountService,
        CurrentUserService,
        AuthenticationGuard,
        SessionService,
        TokenService,
        WebApiClient,
        CommunicationService,
        ClipboardService,
        TokenMapper,
        UserMapper
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
