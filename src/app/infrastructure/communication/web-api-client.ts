import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { environment } from '../../../environments/environment';

@Injectable()
export class WebApiClient {

    constructor(
        private httpClient: HttpClient) { }

    public get<T>(requestUri): Observable<T> {
        return this.httpClient.get<T>(environment.apiUri + requestUri);
    }

    public post<T>(requestUri, data: any): Observable<T> {
        return this.httpClient.post<T>(environment.apiUri + requestUri, data);
    }

    public put<T>(requestUri, data: any): Observable<T> {
        return this.httpClient.put<T>(environment.apiUri + requestUri, data);
    }

    public patch<T>(requestUri, data: any): Observable<T> {
        return this.httpClient.patch<T>(environment.apiUri + requestUri, data);
    }

    public delete<T>(requestUri): Observable<T> {
        return this.httpClient.delete<T>(environment.apiUri + requestUri);
    }
}
