import { Injectable } from '@angular/core';

import { AccessToken } from '../../common/models/token';


@Injectable()
export class TokenProvider {
    getAccessToken(): AccessToken {
        const json = localStorage.getItem('token');

        if (!json) {
            return null;
        }

        const data = JSON.parse(json);

        return <AccessToken>data;
    }

    setAccessToken(accessToken: AccessToken) {
        const json = JSON.stringify(accessToken);

        localStorage.setItem('token', json);
    }
}
