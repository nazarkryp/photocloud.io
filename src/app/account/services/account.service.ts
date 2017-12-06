import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { WebApiClient } from 'app/infrastructure/communication';
import { CurrentUser, User } from 'app/common/models';
import { AccessToken } from 'app/infrastructure/security';
import { CreateAccountRequestModel } from 'app/account/models/request';
import { TokenMapper } from 'app/infrastructure/mapping/token.mapper';

import { environment } from 'app/../environments/environment';

@Injectable()
export class AccountService {
    private currentUser: CurrentUser;

    constructor(
        private webApiClient: WebApiClient,
        private tokenMapper: TokenMapper,
        private httpClient: HttpClient) { }

    public signIn(username: string, password: string): Observable<AccessToken> {
        const body = 'grant_type=password&username=' + username + '&password=' + password;

        return this.httpClient.post(environment.loginUri, body)
            .map(response => {
                return this.tokenMapper.mapResponseToAccessToken(response);
            });
    }

    public create(accountRequestModel: CreateAccountRequestModel) {
        return this.httpClient.post(environment.apiUri + 'account', accountRequestModel);
    }

    public signOut() {
        this.currentUser = null;
    }

    public updateAccount(propertiesToUpdate: any): Observable<CurrentUser> {
        return this.webApiClient.patch<User>('account', propertiesToUpdate);
    }

    public getAccount(): Observable<CurrentUser> {
        return this.webApiClient.get<User>('account');
    }
}
