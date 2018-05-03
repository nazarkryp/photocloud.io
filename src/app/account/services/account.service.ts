import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { WebApiService } from 'app/core/services/communication';
import { CurrentUserViewModel, UserViewModel } from 'app/models/view';
import { AccessToken } from 'app/infrastructure/security';
import { CreateAccountRequestModel } from 'app/account/models/request';
import { TokenMapper } from 'app/infrastructure/mapping/token.mapper';

import { environment } from 'app/../environments/environment';
import { UserMapper } from 'app/infrastructure/mapping';
import { CurrentUserResponse } from 'app/models/response';
import { map } from 'rxjs/operators';

@Injectable()
export class AccountService {
    private currentUser: CurrentUserViewModel;

    constructor(
        private userMapper: UserMapper,
        private apiService: WebApiService,
        private tokenMapper: TokenMapper,
        private httpClient: HttpClient) { }

    public signIn(username: string, password: string): Observable<AccessToken> {
        return this.httpClient.post(environment.loginUri, `grant_type=password&username=${username}&password=${password}`)
            .pipe(map(response => {
                return this.tokenMapper.mapResponseToAccessToken(response);
            }));
    }

    public signInWithCode(code: string): Observable<AccessToken> {
        return this.httpClient.post(`${environment.loginUri}?code=${code}`, 'grant_type=password')
            .pipe(map(response => {
                return this.tokenMapper.mapResponseToAccessToken(response);
            }));
    }

    public enableSignInWithCode(): Observable<any> {
        return this.httpClient.get<any>(environment.apiUri + 'account/code')
            .pipe(map(response => {
                return response.code;
            }));
    }

    public disableSignInWithCode(): Observable<any> {
        return this.httpClient.delete<any>(environment.apiUri + 'account/code');
    }

    public create(accountRequestModel: CreateAccountRequestModel): Observable<any> {
        return this.httpClient.post(environment.apiUri + 'account', accountRequestModel)
            .pipe(map(response => {
                if (accountRequestModel.signInOnCreated) {
                    return this.tokenMapper.mapResponseToAccessToken(response);
                }

                return response;
            }));
    }

    public signOut() {
        this.currentUser = null;
    }

    public updateAccount(propertiesToUpdate: any): Observable<CurrentUserViewModel> {
        return this.apiService.patch<CurrentUserResponse>('account', propertiesToUpdate)
            .pipe(map(response => {
                return this.userMapper.mapFromCurrentUserResponse(response);
            }));
    }

    public changeAccountAttachment(propertiesToUpdate: any): Observable<CurrentUserViewModel> {
        return this.apiService.put<CurrentUserResponse>('account/attachment', propertiesToUpdate)
            .pipe(map(response => {
                return this.userMapper.mapFromCurrentUserResponse(response);
            }));
    }

    public getAccount(): Observable<CurrentUserViewModel> {
        return this.apiService.get<CurrentUserResponse>('account')
            .pipe(map(response => {
                return this.userMapper.mapFromCurrentUserResponse(response);
            }));
    }
}
