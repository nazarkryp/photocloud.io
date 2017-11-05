import { NgModule, ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SessionService } from 'app/infrastructure/session';
import { MemoryCache } from 'app/infrastructure/caching';
import { TokenProvider, AuthenticationInterceptor } from 'app/infrastructure/security';
import { GlobalErrorHandler, HttpErrorInterceptor } from 'app/infrastructure/handlers';
import { HttpConfiguration } from 'app/infrastructure/configuration';
import { UserProvider } from 'app/infrastructure/providers';
import { ClipboardService } from 'app/infrastructure/services';
import { TokenMapper, UserMapper } from 'app/infrastructure/mapping';
import { UserListResolver, UserResolver } from 'app/infrastructure/resolvers';

import {
    AccountNotActiveFilter,
    AuthenticationErrorFilter,
    HttpErrorFilter,
    HttpNotFoundFilter,
    InternetConnectionFilter
} from 'app/infrastructure/filters/http';

@NgModule({
    providers: [
        ClipboardService,
        HttpConfiguration,
        UserProvider,
        TokenProvider,
        TokenMapper,
        UserMapper,
        MemoryCache,
        SessionService,
        UserListResolver,
        UserResolver,
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
            provide: ErrorHandler,
            useClass: GlobalErrorHandler
        }
    ]
})
export class InfrastructureModule {
    constructor(
        router: Router,
        private userProvider: UserProvider,
        private httpConfiguration: HttpConfiguration) {
        this.configureErrorFilters(router);
    }

    private configureErrorFilters(router: Router) {
        this.httpConfiguration.filters.push(new AuthenticationErrorFilter(router));
        this.httpConfiguration.filters.push(new InternetConnectionFilter(router));
        this.httpConfiguration.filters.push(new HttpNotFoundFilter(router));
        this.httpConfiguration.filters.push(new AccountNotActiveFilter(this.userProvider, router));
    }
}
