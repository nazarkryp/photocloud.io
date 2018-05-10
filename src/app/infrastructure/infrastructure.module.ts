import { NgModule, ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { MemoryCache } from 'app/infrastructure/caching';
import { TokenProvider, AuthenticationInterceptor } from 'app/infrastructure/security';
import { HttpErrorInterceptor } from 'app/infrastructure/handlers';
import { HttpErrorHandler } from 'app/infrastructure/configuration';
import { ClipboardService, CurrentUserService } from 'app/infrastructure/services';
import { LocalStorageService } from 'app/infrastructure/services/storage';

import {
    ActivityMapper,
    AttachmentMapper,
    CommentMapper,
    MediaMapper,
    PaginationMapper,
    TokenMapper,
    UserMapper
} from 'app/infrastructure/mapping';

import {
    ActivityResolver,
    LikedMediaResolver,
    RecentMediaResolver,
    UserListResolver,
    UserMediaResolver
} from 'app/infrastructure/resolvers';

import {
    AccountNotActiveFilter,
    AuthenticationErrorFilter,
    HttpErrorFilter,
    HttpNotFoundFilter,
    InternetConnectionFilter
} from 'app/infrastructure/filters/http';

import { ActivityInterceptor } from 'app/services/activity';

@NgModule({
    providers: [
        ActivityMapper,
        AttachmentMapper,
        CommentMapper,
        MediaMapper,
        PaginationMapper,
        ClipboardService,
        HttpErrorHandler,
        CurrentUserService,
        LocalStorageService,
        TokenProvider,
        TokenMapper,
        UserMapper,
        MemoryCache,
        ActivityResolver,
        LikedMediaResolver,
        RecentMediaResolver,
        UserListResolver,
        UserMediaResolver,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthenticationInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ActivityInterceptor,
            multi: true
        }
    ]
})
export class InfrastructureModule {
    constructor(
        private router: Router,
        private currentUserService: CurrentUserService,
        private httpConfiguration: HttpErrorHandler) {
        this.configureErrorFilters();
    }

    private configureErrorFilters() {
        this.httpConfiguration.filters.push(new AuthenticationErrorFilter(this.router, this.currentUserService));
        this.httpConfiguration.filters.push(new InternetConnectionFilter(this.router));
        this.httpConfiguration.filters.push(new HttpNotFoundFilter(this.router));
        this.httpConfiguration.filters.push(new AccountNotActiveFilter(this.currentUserService, this.router));
    }
}
