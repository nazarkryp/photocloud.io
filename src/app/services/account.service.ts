import { Injectable } from '@angular/core';

import { HttpClient } from '../infrastructure/communication/http';
import { SessionService } from '../infrastructure/session/session.service';
import { AccessToken } from '../common/models/token';
import { CurrentUser } from '../common/models/current-user';
import { CommunicationService } from '../infrastructure/communication/communication.service';
import { TokenMapper } from '../infrastructure/mapping/token.mapper';

@Injectable()
export class AccountService {

    constructor(
        private http: HttpClient,
        private sessionService: SessionService,
        private communicationService: CommunicationService,
        private tokenMapper: TokenMapper) { }

    async signIn(account: any): Promise<AccessToken> {
        const body = 'grant_type=password&username=' + account.username + '&password=' + account.password;

        const accessToken = await this.http.post('authorize', body)
            .then(response => this.tokenMapper.mapResponseToAccessToken(response.json()))
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

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.json());
    }
}
