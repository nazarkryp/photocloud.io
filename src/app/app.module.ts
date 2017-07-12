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

import { PostService } from './services/post.service';
import { AccountService } from './services/account.service';
import { AuthenticationGuard } from './infrastructure/guards/authentication-guard.service';
import { SessionService } from './infrastructure/session/session.service';
import { TokenService } from './infrastructure/security/token.service';
import { WebApiClient } from './infrastructure/communication/webapi';
import { CommunicationService } from './infrastructure/communication/communication.service';

import { TimeAgoPipe } from 'time-ago-pipe';
import { SigninComponent } from './components/signin/signin.component';
import { UserPostsComponent } from './components/user-posts/user-posts.component';

@NgModule({
    declarations: [
        AppComponent,
        PostsComponent,
        NavbarComponent,
        PostComponent,
        TimeAgoPipe,
        SigninComponent,
        UserPostsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AppMaterialModule,
        FlexLayoutModule,
        HttpModule,
        FormsModule
    ],
    providers: [
        PostService,
        AccountService,
        AuthenticationGuard,
        SessionService,
        TokenService,
        WebApiClient,
        CommunicationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
