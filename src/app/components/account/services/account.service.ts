import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { UserProvider } from 'app/infrastructure/providers/user.provider';
import { WebApiClient } from 'app/infrastructure/communication';
import { SessionService } from 'app/infrastructure/session';
import { AccessToken, CurrentUser, User } from 'app/common/models';
import { TokenMapper } from 'app/infrastructure/mapping/token.mapper';

import { environment } from 'app/../environments/environment';

@Injectable()
export class AccountService {
    private currentUser: CurrentUser;

    constructor(
        private webApiClient: WebApiClient,
        private sessionService: SessionService,
        private userProvider: UserProvider,
        private tokenMapper: TokenMapper,
        private httpClient: HttpClient) { }

    public signIn(account: any): Observable<AccessToken> {
        const body = 'grant_type=password&username=' + account.username + '&password=' + account.password;

        return this.httpClient.post(environment.loginUri, body)
            .map(response => {
                return this.tokenMapper.mapResponseToAccessToken(response);
            })
            ._do(accessToken => {
                this.userProvider.setCurrentUser(accessToken);
            });
    }

    public create(account: any) {
        return this.httpClient.post(environment.apiUri + 'account', account);
    }

    public signOut() {
        this.currentUser = null;
        this.sessionService.clearSession();
        this.userProvider.setCurrentUser(null);
    }

    public updateAccount(propertiesToUpdate: any): Observable<User> {
        return this.webApiClient.patch<User>('account', propertiesToUpdate)
            .do(account => {
                this.userProvider.updateCurrentUser(account);
            });
    }

    public getAccountSettings(): Observable<User> {
        return this.webApiClient.get<User>('account');
    }

    public getCurrentUser(refresh: boolean = true): CurrentUser {
        if (this.currentUser && !refresh) {
            return this.currentUser;
        }

        const accessToken = this.sessionService.getSession();

        if (accessToken == null) {
            return null;
        }

        this.currentUser = new CurrentUser();

        this.currentUser.id = accessToken.userId;
        this.currentUser.username = accessToken.username;
        this.currentUser.pictureUri = accessToken.pictureUri;
        this.currentUser.isPrivate = accessToken.isPrivate;
        this.currentUser.isActive = accessToken.isActive;

        return this.currentUser;
    }
}
