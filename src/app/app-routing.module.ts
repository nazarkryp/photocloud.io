import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Routes, RouterModule, Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { PostsComponent } from './components/posts/posts.component';
import { UserPostsComponent } from './components/user-posts/user-posts.component';
import { UserSearchComponent } from './components/explore/user-search/user-search.component';
import { SigninComponent } from './components/signin/signin.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PostDetailsComponent } from './components/shared/post-details/post-details.component';
import { SignupComponent } from './components/signup/signup.component';
import { TagsComponent } from './components/explore/tags/tags.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ConnectionErrorComponent } from './components/shared/connection-error/connection-error.component';

import { AuthenticationGuard } from './infrastructure/guards/authentication-guard.service';

const routes: Routes = [
    {
        path: '',
        component: PostsComponent,
        canActivate: [AuthenticationGuard],
        data: {
            title: 'PhotoCloud - Feed'
        }
    },
    {
        path: 'signin',
        component: SigninComponent,
        canActivate: [AuthenticationGuard],
        data: {
            title: 'PhotoCloud - Sign In'
        }
    },
    {
        path: 'account/create',
        component: SignupComponent,
        canActivate: [AuthenticationGuard],
        data: {
            title: 'PhotoCloud - Create Account'
        }
    },
    {
        path: 'account/edit',
        component: SettingsComponent,
        canActivate: [AuthenticationGuard],
        data: {
            title: 'PhotoCloud - Edit Account'
        }
    },
    {
        path: '404',
        component: NotFoundComponent,
        data: {
            title: 'PhotoCloud - Page Not Found'
        }
    },
    {
        path: 'nointernetconnection',
        component: ConnectionErrorComponent,
        data: {
            title: 'Connect to the internet'
        }
    },
    {
        path: ':username',
        component: UserPostsComponent,
        data: {
            title: 'PhotoCloud - User\' Posts'
        }
    },
    {
        path: 'p/:postId',
        component: PostDetailsComponent,
        data: {
            title: 'PhotoCloud - Post'
        }
    },
    {
        path: 'explore/tags/:tag',
        component: TagsComponent,
        data: {
            title: 'PhotoCloud - Explore Tags'
        }
    },
    {
        path: 'explore/people',
        component: UserSearchComponent,
        data: {
            title: 'PhotoCloud - Discover People'
        }
    }
];

declare var ga;

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
    constructor(router: Router, activatedRoute: ActivatedRoute, title: Title) {
        router.events.filter(e => e instanceof NavigationEnd).subscribe((event) => {
            const pageTitle = router.routerState.snapshot.root.children[0].data['title'];
            if (pageTitle) {
                title.setTitle(pageTitle);
            } else if (pageTitle !== false) {
                title.setTitle('My Default Title');
            }

            // ga('send', 'pageview', event.urlAfterRedirects);
        });
    }
}
