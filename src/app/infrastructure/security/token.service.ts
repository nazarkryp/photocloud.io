import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { environment } from '../../../environments/environment'
import { SessionService } from '../session/session.service';
import { AccessToken } from '../../common/models/token';

import { CommunicationService } from '../communication/communication.service';

@Injectable()
export class TokenService {
    private refreshTimeout = 5;

    constructor(
        private sessionService: SessionService,
        private http: Http,
        private communicationService: CommunicationService) { }

    async getAccessToken(): Promise<AccessToken> {
        let accessToken = this.sessionService.getSession();

        if (!accessToken) {
            return null;
        }

        const now = new Date();
        const expiresIn = (accessToken.expires.getTime() - now.getTime()) / 1000 / 60;
        const useRefreshToken = accessToken.refreshToken && expiresIn < this.refreshTimeout;

        if (useRefreshToken && expiresIn > 0) {
            accessToken = await this.refreshToken(accessToken.refreshToken);
            this.sessionService.setSession(accessToken);
        }

        if (expiresIn <= 0) {
            this.sessionService.clearSession();
            this.communicationService.changeState(null);

            return null;
        }

        this.communicationService.changeState(accessToken);

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
