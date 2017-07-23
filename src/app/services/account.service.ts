import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { CommunicationService, WebApiClient } from '../infrastructure/communication';
import { SessionService } from '../infrastructure/session';
import { AccessToken, CurrentUser } from '../common/models';
import { TokenMapper } from '../infrastructure/mapping/token.mapper';

@Injectable()
export class AccountService {
    private currentUser: CurrentUser;

    constructor(
        private webApiClient: WebApiClient,
        private sessionService: SessionService,
        private communicationService: CommunicationService,
        private tokenMapper: TokenMapper) { }

    signIn(account: any): Observable<AccessToken> {
        const body = 'grant_type=password&username=' + account.username + '&password=' + account.password;

        return this.webApiClient.post('authorize', body)
            .map(response => {
                console.log('map');
                return this.tokenMapper.mapResponseToAccessToken(response);
            })
            ._do(accessToken => {
                console.log('_do');
                this.sessionService.setSession(accessToken)
            });
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

        if (accessToken == null) {
            return null;
        }

        this.currentUser = new CurrentUser();

        this.currentUser.id = accessToken.userId;
        this.currentUser.username = accessToken.username;
        this.currentUser.pictureUri = accessToken.pictureUri;
        this.currentUser.isPrivate = accessToken.isPrivate;
        this.currentUser.isActive = accessToken.isActive;

        return this.currentUser;
    }
}
