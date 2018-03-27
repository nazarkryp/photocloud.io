import { Injectable } from '@angular/core';

import { AccessToken } from 'app/infrastructure/security/access-token.model';

@Injectable()
export class TokenMapper {
    public mapResponseToAccessToken(response: any): AccessToken {
        const accessToken = new AccessToken();

        accessToken.accessToken = response['access_token'];
        accessToken.refreshToken = response['refresh_token'];
        accessToken.code = response['code'];
        accessToken.tokenType = response['token_type'];
        accessToken.expiresIn = response['expires_in'];
        accessToken.issued = new Date(response['.issued']);
        accessToken.expires = new Date(response['.expires']);

        return accessToken;
    }
}
