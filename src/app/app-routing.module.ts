import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Routes, RouterModule, Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { PostsComponent } from './components/posts/posts.component';
import { UserPostsComponent } from './components/user-posts/user-posts.component';
import { UserSearchComponent } from './components/explore/user-search/user-search.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MediaDetailsComponent } from './components/shared/media-details/media-details.component';
import { TagsComponent } from './components/explore/tags/tags.component';
import { ConnectionErrorComponent } from './components/shared/connection-error/connection-error.component';
import { AuthenticationGuardService } from './infrastructure/guards/authentication-guard.service';
import { MediaResolver, UserResolver, UserListResolver } from './infrastructure/resolvers';

const routes: Routes = [
    {
        path: '',
        component: PostsComponent,
        canActivate: [AuthenticationGuardService],
        resolve: { page: MediaResolver },
        data: {
            title: 'PhotoCloud'
        }
    },
    {
        path: 'account',
        loadChildren: 'app/account/account.module#AccountModule',
        canActivate: [
            AuthenticationGuardService
        ],
        data: {
            title: 'PhotoCloud - Account'
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
        resolve: { user: UserResolver },
        data: {
            title: 'PhotoCloud - UserViewModel\' Posts'
        }
    },
    {
        path: 'p/:postId',
        component: MediaDetailsComponent,
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
        resolve: { page: UserListResolver },
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
        // router.events.filter(e => e instanceof NavigationEnd).subscribe((event) => {
        //     const pageTitle = router.routerState.snapshot.root.children[0].data['title'];
        //     if (pageTitle) {
        //         title.setTitle(pageTitle);
        //     } else {
        //         title.setTitle('PhotoCloud');
        //     }
        // });
    }
}
