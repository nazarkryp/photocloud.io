import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { PostsComponent } from './components/posts/posts.component';
import { UserPostsComponent } from './components/user-posts/user-posts.component';
import { SigninComponent } from './components/signin/signin.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PostDetailsComponent } from './components/shared/post-details/post-details.component';
import { SignupComponent } from './components/signup/signup.component';
import { TagsComponent } from './components/explore/tags/tags.component';

import { AuthenticationGuard } from './infrastructure/guards/authentication-guard.service';

const routes: Routes = [
    {
        path: '',
        component: PostsComponent,
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'signin',
        component: SigninComponent,
        canActivate: [AuthenticationGuard]
    },
    {
        path: 'account/create',
        component: SignupComponent,
        canActivate: [AuthenticationGuard]
    },
    {
        path: '404',
        component: NotFoundComponent
    },
    {
        path: ':username',
        component: UserPostsComponent
    },
    {
        path: 'p/:postId',
        component: PostDetailsComponent
    },
    {
        path: 'explore/tags/:tag',
        component: TagsComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
