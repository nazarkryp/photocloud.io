import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { UserProvider } from 'app/infrastructure/providers/user.provider';
import { WebApiClient } from 'app/infrastructure/communication';
import { SessionService } from 'app/infrastructure/session';
import { AccessToken, CurrentUser, User } from 'app/common/models';
import { CreateAccountRequestModel } from 'app/account/models/request';
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

    public signIn(username: string, password: string): Observable<AccessToken> {
        const body = 'grant_type=password&username=' + username + '&password=' + password;

        return this.httpClient.post(environment.loginUri, body)
            .map(response => {
                return this.tokenMapper.mapResponseToAccessToken(response);
            })
            ._do(accessToken => {
                this.userProvider.setCurrentUser(accessToken);
            });
    }

    public create(accountRequestModel: CreateAccountRequestModel) {
        return this.httpClient.post(environment.apiUri + 'account', accountRequestModel);
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

    public getAccount(): Observable<CurrentUser> {
        return this.webApiClient.get<User>('account');
    }

    public retrieveCurrentUser(refresh: boolean = true): CurrentUser {
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
