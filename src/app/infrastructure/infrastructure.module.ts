import { NgModule, ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { MemoryCache } from 'app/infrastructure/caching';
import { TokenProvider, AuthenticationInterceptor } from 'app/infrastructure/security';
import { HttpErrorInterceptor } from 'app/infrastructure/handlers';
import { HttpErrorHandler } from 'app/infrastructure/configuration';
import { CurrentUserService } from 'app/infrastructure/services';
import { LocalStorageService } from 'app/infrastructure/services/storage';
import { ClipboardService } from 'app/infrastructure/services';
import { TokenMapper, UserMapper } from 'app/infrastructure/mapping';
import { RecentMediaResolver, LikedMediaResolver, UserListResolver, UserMediaResolver } from 'app/infrastructure/resolvers';

import {
    AccountNotActiveFilter,
    AuthenticationErrorFilter,
    HttpErrorFilter,
    HttpNotFoundFilter,
    InternetConnectionFilter
} from 'app/infrastructure/filters/http';
import { AttachmentMapper, CommentMapper, MediaMapper, PaginationMapper } from 'app/infrastructure/mapping';
import { IncommingRequestsInterceptor } from 'app/account/services/interceptors/incomming-requests.interceptor';

@NgModule({
    providers: [
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
            useClass: IncommingRequestsInterceptor,
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
