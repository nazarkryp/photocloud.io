import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';

import { TokenService } from '../security/token.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class WebApiClient {
    constructor(private http: Http, private tokenService: TokenService) { }

    async get(requestUri: string): Promise<Response> {
        const options = await this.getRequestOptions();

        return this.http.get(environment.apiUri + requestUri, options)
            .toPromise();
    }

    async post(requestUri: string, data: any) {
        const options = await this.getRequestOptions();

        return this.http.post(environment.apiUri + requestUri, data, options)
            .toPromise();
    }

    async put(requestUri: string, data: any) {
        const options = await this.getRequestOptions();

        return this.http.put(environment.apiUri + requestUri, data, options)
            .toPromise();
    }

    async delete(requestUri: string) {
        const options = await this.getRequestOptions();

        return this.http.delete(environment.apiUri + requestUri, options)
            .toPromise();
    }

    async patch(requestUri: string, data: any) {
        const options = await this.getRequestOptions();

        return this.http.patch(environment.apiUri + requestUri, data, options)
            .toPromise();
    }

    private async getRequestOptions(): Promise<RequestOptions> {
        const accessToken = await this.tokenService.getAccessToken();
        const options = new RequestOptions();

        if (accessToken != null) {
            options.headers = new Headers({
                'Authorization': 'Bearer ' + accessToken.accessToken
            });
        }

        return options;
    }
}
