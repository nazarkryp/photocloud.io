import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Routes, RouterModule, Router, ActivatedRoute, NavigationEnd, PreloadAllModules } from '@angular/router';

import { MediaComponent } from './components/media/media.component';
import { UserMediaComponent } from './components/user-media/user-media.component';
import { UsersComponent } from './components/explore/users/users.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MediaDetailsComponent } from './components/shared/media-details/media-details.component';
import { TagsComponent } from './components/explore/tags/tags.component';
import { ConnectionErrorComponent } from './components/shared/connection-error/connection-error.component';
import { AuthenticationGuardService } from './infrastructure/guards/authentication-guard.service';
import { RecentMediaResolver, UserMediaResolver, UserListResolver, LikedMediaResolver } from './infrastructure/resolvers';
import { LikedMediaComponent } from 'app/components/liked-media/liked-media.component';
import { TermsComponent } from 'app/components/terms/terms.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
    {
        path: '',
        component: MediaComponent,
        canActivate: [AuthenticationGuardService],
        resolve: { page: RecentMediaResolver },
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
        path: 'offline',
        component: ConnectionErrorComponent,
        data: {
            title: 'Connect to the internet'
        }
    },
    {
        path: 'terms',
        component: TermsComponent,
        data: {
            title: 'PhotoCloud - Terms of Services'
        }
    },
    {
        path: 'privacy',
        component: PrivacyComponent,
        data: {
            title: 'PhotoCloud - Privacy Policy'
        }
    },
    {
        path: 'about',
        component: AboutComponent,
        data: {
            title: 'PhotoCloud - About Us'
        }
    },
    {
        path: ':username',
        component: UserMediaComponent,
        resolve: {
            userMedia: UserMediaResolver
        },
        data: {
            title: 'PhotoCloud - User Posts'
        }
    },
    {
        path: 'p/:mediaId',
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
        path: ':username/liked',
        component: LikedMediaComponent,
        resolve: {
            page: LikedMediaResolver
        },
        data: {
            title: 'PhotoCloud - Liked'
        }
    },
    {
        path: 'explore/people',
        component: UsersComponent,
        resolve: { page: UserListResolver },
        data: {
            title: 'PhotoCloud - Discover People'
        }
    }
];

declare var ga;

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
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
