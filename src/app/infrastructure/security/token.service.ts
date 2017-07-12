import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { environment } from '../../../environments/environment'
import { SessionService } from '../session/session.service';
import { AccessToken } from '../../common/models/token';

@Injectable()
export class TokenService {
    private refreshTimeout = 5;

    constructor(
        private sessionService: SessionService,
        private http: Http) { }

    async getAccessToken(): Promise<AccessToken> {
        let accessToken = this.sessionService.getSession();

        if (!accessToken) {
            return null;
        }
        const now = new Date();
        const tokenExpirationTime = new Date(accessToken.expires);
        const expiresIn = (tokenExpirationTime.getTime() - now.getTime()) / 1000 / 60;
        const useRefreshToken = accessToken.refreshToken && expiresIn < this.refreshTimeout;

        if (useRefreshToken && expiresIn > 0) {
            console.log('Refreshing token...');
            accessToken = await this.refreshToken(accessToken.refreshToken);
            this.sessionService.setSession(accessToken);
        }

        return accessToken;
    }

    private async refreshToken(refreshToken: string): Promise<AccessToken> {
        const data = 'grant_type=refresh_token&refresh_token=' + refreshToken;

        return this.http.post(environment.apiUri + 'authorize', data)
            .toPromise()
            .then(response => response.json() as AccessToken);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}
