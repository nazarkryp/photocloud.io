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

import { TimeAgoPipe } from 'time-ago-pipe';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    NavbarComponent,
    PostComponent,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    FlexLayoutModule,
    HttpModule
  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
