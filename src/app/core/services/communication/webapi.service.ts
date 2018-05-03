import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpSentEvent, HttpUserEvent, HttpEvent, HttpEventType, HttpResponseBase } from '@angular/common/http';

import { Observable } from 'rxjs';
import { last, tap, map } from 'rxjs/operators';

import { environment } from 'app/../environments/environment';

@Injectable()
export class WebApiService {
    private readonly baseAddress: string;

    constructor(
        private httpClient: HttpClient) {
        this.baseAddress = environment.apiUri;
    }

    public get<T>(requestUri: string): Observable<T> {
        return this.httpClient.get<T>(`${this.baseAddress}${requestUri}`);
    }

    public post<T>(requestUri: string, data: any): Observable<T> {
        return this.httpClient.post<T>(`${this.baseAddress}${requestUri}`, data);
    }

    public put<T>(requestUri: string, data: any): Observable<T> {
        return this.httpClient.put<T>(`${this.baseAddress}${requestUri}`, data);
    }

    public patch<T>(requestUri: string, data: any): Observable<T> {
        return this.httpClient.patch<T>(`${this.baseAddress}${requestUri}`, data);
    }

    public delete<T>(requestUri: string): Observable<T> {
        return this.httpClient.delete<T>(`${this.baseAddress}${requestUri}`);
    }

    public postWithProgress<T>(requestUri: string,
        data: any,
        onProgressChanged: (event: HttpProgressEvent) => void,
        onCompleted: (event: HttpResponseBase) => void): Observable<T> {
        const request = new HttpRequest<any>('POST', `${this.baseAddress}${requestUri}`, data, { reportProgress: true });

        return this.httpClient.request<T>(request)
            .pipe(tap((event: HttpEvent<any>) => {
                switch (event.type) {
                    case HttpEventType.UploadProgress:
                        onProgressChanged(event);
                        break;
                    case HttpEventType.Response:
                        onCompleted(event);
                        break;
                }
            }), last(), map(event => {
                switch (event.type) {
                    case HttpEventType.Response:
                        return event.body as T;
                }
            }));
    }
}
