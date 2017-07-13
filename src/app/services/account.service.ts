import { Injectable } from '@angular/core';

import { HttpClient } from '../infrastructure/communication/http';
import { SessionService } from '../infrastructure/session/session.service';
import { AccessToken } from '../common/models/token';
import { CurrentUser } from '../common/models/current-user';
import { CommunicationService } from '../infrastructure/communication/communication.service';

@Injectable()
export class AccountService {

    constructor(
        private http: HttpClient,
        private sessionService: SessionService,
        private communicationService: CommunicationService) { }

    async signIn(account: any): Promise<AccessToken> {
        const body = 'grant_type=password&username=' + account.username + '&password=' + account.password;
        const accessToken = await this.http.post('authorize', body)
            .then(response => this.mapResponseToAccessToken(response.json()))
            .catch(this.handleError);

        this.sessionService.setSession(accessToken);

        return accessToken;
    }

    signOut() {
        this.sessionService.clearSession();
        this.communicationService.changeState(null);
    }

    getCurrentUser(): CurrentUser {
        const accessToken = this.sessionService.getSession();

        const currentUser = new CurrentUser();
        currentUser.id = accessToken.userId;
        currentUser.username = accessToken.username;
        currentUser.pictureUri = accessToken.pictureUri;
        currentUser.isPrivate = accessToken.isPrivate;
        currentUser.isActive = accessToken.isActive;

        return currentUser;
    }

    private mapResponseToAccessToken(response: any): AccessToken {
        const accessToken = new AccessToken();

        accessToken.accessToken = response['access_token'];
        accessToken.refreshToken = response['refresh_token'];
        accessToken.tokenType = response['token_type'];
        accessToken.expiresIn = response['expires_in'];
        accessToken.issued = new Date(response['.issued']);
        accessToken.expires = new Date(response['.expires']);
        accessToken.userId = Number(response['userId']);
        accessToken.username = response['userName'];
        accessToken.isPrivate = response['isPrivate'];
        accessToken.isActive = response['isActive'];
        accessToken.pictureUri = response['pictureUri'];

        return accessToken;
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.json());
    }
}
