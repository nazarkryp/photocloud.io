import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { WebApiClient } from 'app/infrastructure/communication';
import { CurrentUserViewModel, UserViewModel } from 'app/models/view';
import { AccessToken } from 'app/infrastructure/security';
import { CreateAccountRequestModel } from 'app/account/models/request';
import { TokenMapper } from 'app/infrastructure/mapping/token.mapper';

import { environment } from 'app/../environments/environment';
import { UserMapper } from 'app/infrastructure/mapping';
import { CurrentUserResponse } from 'app/models/response';

@Injectable()
export class AccountService {
    private currentUser: CurrentUserViewModel;

    constructor(
        private userMapper: UserMapper,
        private webApiClient: WebApiClient,
        private tokenMapper: TokenMapper,
        private httpClient: HttpClient) { }

    public signIn(username: string, password: string): Observable<AccessToken> {
        return this.httpClient.post(environment.loginUri, `grant_type=password&username=${username}&password=${password}`)
            .map(response => {
                return this.tokenMapper.mapResponseToAccessToken(response);
            });
    }

    public signInWithCode(code: string): Observable<AccessToken> {
        return this.httpClient.post(`${environment.loginUri}?code=${code}`, 'grant_type=password')
            .map(response => {
                return this.tokenMapper.mapResponseToAccessToken(response);
            });
    }

    public enableSignInWithCode(): Observable<any> {
        return this.httpClient.get<any>(environment.apiUri + 'account/code')
            .map(response => {
                return response.code;
            });
    }

    public disableSignInWithCode(): Observable<any> {
        return this.httpClient.delete<any>(environment.apiUri + 'account/code');
    }

    public create(accountRequestModel: CreateAccountRequestModel): Observable<any> {
        return this.httpClient.post(environment.apiUri + 'account', accountRequestModel)
            .map(response => {
                if (accountRequestModel.signInOnCreated) {
                    return this.tokenMapper.mapResponseToAccessToken(response);
                }

                return response;
            });
    }

    public signOut() {
        this.currentUser = null;
    }

    public updateAccount(propertiesToUpdate: any): Observable<CurrentUserViewModel> {
        return this.webApiClient.patch<CurrentUserResponse>('account', propertiesToUpdate)
            .map(response => {
                return this.userMapper.mapFromCurrentUserResponse(response);
            });
    }

    public changeAccountAttachment(propertiesToUpdate: any): Observable<CurrentUserViewModel> {
        return this.webApiClient.put<CurrentUserResponse>('account/attachment', propertiesToUpdate)
            .map(response => {
                return this.userMapper.mapFromCurrentUserResponse(response);
            });
    }

    public getAccount(): Observable<CurrentUserViewModel> {
        return this.webApiClient.get<CurrentUserResponse>('account')
            .map(response => {
                return this.userMapper.mapFromCurrentUserResponse(response);
            });
    }
}
