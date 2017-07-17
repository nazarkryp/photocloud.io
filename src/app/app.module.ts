import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
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
import { PostDetailsComponent } from './components/shared/post-details/post-details.component';
import { CommentsComponent } from './components/shared/comments/comments.component';

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

import { TokenMapper } from './infrastructure/mapping/token.mapper';
import { UserMapper } from './infrastructure/mapping/user.mapper';

import { TimeAgoPipe } from 'time-ago-pipe';
import { NgProgressModule } from 'ngx-progressbar';

import { RelationshipActionPipe } from './pipes/relationship-action.pipe';

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
        PostDetailsComponent,
        RelationshipActionPipe,
        CommentsComponent
    ],
    entryComponents: [
        PostDetailsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AppMaterialModule,
        FlexLayoutModule,
        HttpModule,
        FormsModule,
        NgProgressModule
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
        TokenMapper,
        UserMapper
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
