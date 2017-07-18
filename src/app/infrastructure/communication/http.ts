import { Injectable } from '@angular/core';
// import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/retry';
import { Observable } from 'rxjs/Observable';

import { TokenService } from '../security/token.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class WebApiClient {
    constructor(private http: HttpClient, private tokenService: TokenService) { }

    async get(requestUri: string): Promise<Object> {
        const headers = await this.getRequestHeaders();

        return this.http.get(environment.apiUri + requestUri, { headers: headers })
            .retry(3)
            .toPromise();
    }

    async post(requestUri: string, data: any): Promise<Object> {
        const headers = await this.getRequestHeaders();

        return this.http.post(environment.apiUri + requestUri, data, { headers: headers })
            .retry(3)
            .toPromise();
    }

    async put(requestUri: string, data: any): Promise<Object> {
        const headers = await this.getRequestHeaders();

        return this.http.put(environment.apiUri + requestUri, data, { headers: headers })
            .retry(3)
            .toPromise();
    }

    async delete(requestUri: string): Promise<Object> {
        const headers = await this.getRequestHeaders();

        return this.http.delete(environment.apiUri + requestUri, { headers: headers })
            .retry(3)
            .toPromise();
    }

    async patch(requestUri: string, data: any): Promise<Object> {
        const headers = await this.getRequestHeaders();

        return this.http.patch(environment.apiUri + requestUri, data, { headers: headers })
            .retry(3)
            .toPromise();
    }

    private async getRequestHeaders(): Promise<HttpHeaders> {
        const accessToken = await this.tokenService.getAccessToken();

        if (accessToken == null) {
            return null;
        }

        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + accessToken.accessToken
        });

        return headers;
    }
}
