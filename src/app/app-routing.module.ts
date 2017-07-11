import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { PostsComponent } from './components/posts/posts.component';
import { UserPostsComponent } from './components/user-posts/user-posts.component';
import { SigninComponent } from './components/signin/signin.component';

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
        path: ':username',
        component: UserPostsComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
