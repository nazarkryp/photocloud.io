import { Injectable } from '@angular/core';

import { WebApiClient } from '../infrastructure/communication/http';
import { SessionService } from '../infrastructure/session/session.service';
import { AccessToken } from '../common/models/token';
import { CurrentUser } from '../common/models/current-user';
import { CommunicationService } from '../infrastructure/communication/communication.service';
import { TokenMapper } from '../infrastructure/mapping/token.mapper';

@Injectable()
export class AccountService {
    private currentUser: CurrentUser;

    constructor(
        private http: WebApiClient,
        private sessionService: SessionService,
        private communicationService: CommunicationService,
        private tokenMapper: TokenMapper) { }

    async signIn(account: any): Promise<AccessToken> {
        const body = 'grant_type=password&username=' + account.username + '&password=' + account.password;

        const accessToken = await this.http.post('authorize', body)
            .then(response => this.tokenMapper.mapResponseToAccessToken(response))
            .catch(error => this.handleError(error));

        this.sessionService.setSession(accessToken);

        return accessToken;
    }

    signOut() {
        this.sessionService.clearSession();
        this.communicationService.changeState(null);
    }

    getCurrentUser(refresh: boolean = true): CurrentUser {
        if (this.currentUser && !refresh) {
            return this.currentUser;
        }

        const accessToken = this.sessionService.getSession();

        this.currentUser = new CurrentUser();

        this.currentUser.id = accessToken.userId;
        this.currentUser.username = accessToken.username;
        this.currentUser.pictureUri = accessToken.pictureUri;
        this.currentUser.isPrivate = accessToken.isPrivate;
        this.currentUser.isActive = accessToken.isActive;

        return this.currentUser;
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }
}
