import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { PostsComponent } from './components/posts/posts.component';
import { SigninComponent } from './components/signin/signin.component';

const routes: Routes = [
    {
        path: '',
        component: PostsComponent
    },
    {
        path: 'signin',
        component: SigninComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
