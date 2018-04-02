import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { LocalStorageService } from 'app/infrastructure/services/storage';
import { AccessToken } from 'app/infrastructure/security/access-token.model';
import { TokenMapper } from 'app/infrastructure/mapping/token.mapper';
import { environment } from 'app/../environments/environment';

@Injectable()
export class TokenProvider {
    private refreshTimeout = 5;
    private accessToken: AccessToken;

    private get tokenStorageKey() {
        return 'photocloud-access-token'
    }

    constructor(
        private storageService: LocalStorageService,
        private tokenMapper: TokenMapper,
        private httpClient: HttpClient
    ) { }

    public getAccessToken(): Observable<AccessToken> {
        const accessToken = this.retrieveAccessToken();

        if (!accessToken) {
            return Observable.of(null);
        }

        const now = new Date();
        const expiresIn = (accessToken.expires.getTime() - now.getTime()) / 1000 / 60;
        const useRefreshToken = accessToken.refreshToken && expiresIn < this.refreshTimeout;

        if (useRefreshToken && expiresIn > 0) {
            return this.refreshToken(accessToken.refreshToken)
                .do(refreshedAccessToken => {
                    this.setAccessToken(refreshedAccessToken);
                });
        }

        if (expiresIn <= 0) {
            if (!accessToken.code) {
                this.storageService.clear();
            }

            return Observable.of(null);
        }

        return Observable.of(accessToken);
    }

    public setAccessToken(accessToken: AccessToken) {
        this.storageService.set<AccessToken>(this.tokenStorageKey, accessToken);
        this.accessToken = accessToken;
    }

    private refreshToken(refreshToken: string): Observable<AccessToken> {
        const refreshTokenData = `grant_type=refresh_token&refresh_token=${refreshToken}`;

        return this.httpClient.post<any>(environment.loginUri, refreshTokenData)
            .map(tokenResponse => this.tokenMapper.mapResponseToAccessToken(tokenResponse));
    }

    public retrieveAccessToken(): AccessToken {
        const accessToken = this.storageService.get<AccessToken>(this.tokenStorageKey, AccessToken);

        if (accessToken) {
            accessToken.expires = new Date(accessToken.expires);
            accessToken.issued = new Date(accessToken.issued);
        }

        this.accessToken = accessToken;

        return accessToken;
    }

    public get isTokenValid(): boolean {
        const accessToken = this.retrieveAccessToken();

        if (!accessToken || ((accessToken.expires.getTime() - new Date().getTime()) / 1000 / 60) <= 0) {
            return false;
        }

        return true;
    }

    public removeAccessToken() {
        this.storageService.removeItem(this.tokenStorageKey);
        this.accessToken = null;
    }
}
