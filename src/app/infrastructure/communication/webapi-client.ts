import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

import { TokenProvider } from './token-provider';

@Injectable()
export class WebApiClient {
    constructor(private http: Http, private tokenProvider: TokenProvider) { }

    get(requestUri: string) {
        const options = this.getRequestOptions();

        return this.http.get(requestUri, options)
            .toPromise();
    }

    private getRequestOptions() {
        const accessToken = this.tokenProvider.getAccessToken();

        const options = new RequestOptions();

        if (accessToken != null) {
            options.headers = new Headers({
                'Authorization': 'Bearer ' + accessToken.access_token
            });
        }

        return options;
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}
