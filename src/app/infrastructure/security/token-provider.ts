import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

import { AccessToken } from '../../common/models';

import { SessionService } from '../session/session.service';
import { TokenMapper } from '../mapping';

@Injectable()
export class TokenProvider {
    private refreshTimeout = 5;

    constructor(
        private sessionService: SessionService,
        private tokenMapper: TokenMapper,
        private httpClient: HttpClient
    ) { }

    getAccessToken(): Observable<AccessToken> {
        let accessToken = this.sessionService.getSession();

        if (!accessToken) {
            return null;
        }

        const now = new Date();
        const expiresIn = (accessToken.expires.getTime() - now.getTime()) / 1000 / 60;
        const useRefreshToken = accessToken.refreshToken && expiresIn < this.refreshTimeout;

        if (useRefreshToken && expiresIn > 0) {
            const refreshTokenObservable = this.refreshToken(accessToken.refreshToken);

            refreshTokenObservable.subscribe(token => {
                accessToken = token;
                this.sessionService.setSession(token);

                return token;
            });

            return refreshTokenObservable;
        }

        if (expiresIn <= 0) {
            this.sessionService.clearSession();

            return null;
        }

        return Observable.of(accessToken);
    }

    private refreshToken(refreshToken: string): Observable<AccessToken> {
        const data = `grant_type=refresh_token&refresh_token=${refreshToken}`;

        return this.httpClient.post('authorize', refreshToken)
            .map(response => this.tokenMapper.mapResponseToAccessToken(response));
    }
}
