import { Injectable } from '@angular/core';

import { AccessToken } from '../../common/models/token';

@Injectable()
export class SessionService {
    private sessionKey = 'photocloud_session';

    setSession(token: AccessToken): void {
        const json = JSON.stringify(token);

        localStorage.setItem(this.sessionKey, json);
    }

    getSession(): AccessToken {
        const json = localStorage.getItem(this.sessionKey);

        if (!json) {
            return null;
        }

        const data = JSON.parse(json);

        return <AccessToken>data;
    }

    clearSession(): void {
        localStorage.removeItem(this.sessionKey);
    }
}
