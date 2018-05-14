import { Injectable, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { Observable, Observer, ReplaySubject } from 'rxjs';

import { TokenProvider } from 'app/infrastructure/security';
import { environment } from 'app/../environments/environment';

declare var $: any;

@Injectable()
export class HubConnectionService {
    private connections: { [connectionName: string]: ReplaySubject<any> } = {};
    private started: boolean;
    private state = new ReplaySubject<any>(1);
    private proxy: any;
    private readonly connection: any;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private tokenProvider: TokenProvider) {
        this.connection = $.hubConnection(this.connectionUri, { useDefaultPath: false });
    }

    public start(): Observable<any> {
        this.proxy = this.connection.createHubProxy('notificationsHub');

        const accessToken = this.tokenProvider.retrieveAccessToken();

        if (accessToken && accessToken.accessToken) {
            this.connection.qs = { 'access_token': accessToken.accessToken };
        }

        this.proxy.on('connected', (data) => { });

        return Observable.create((observer: Observer<any>) => {
            this.connection.start()
                .done(() => {
                    observer.next(true);
                    // console.log(this.connection.stop);
                })
                .fail(() => {
                    observer.error('Connection Error');
                });
        });
    }

    public stop() {
        this.connection.stop().done(() => {
            console.log('Connection closed');
        }).fail(() => {
            console.log('Could not close connection');
        });
    }

    public get<T>(connectionName: string): Observable<T> {
        let connection = this.connections[connectionName];

        if (!connection) {
            connection = (this.connections[connectionName] = new ReplaySubject<T>());

            this.proxy.on(connectionName, (data) => {
                connection.next(data);
            });
        }

        return connection.asObservable();
    }

    private get connectionUri(): string {
        const pathArray = this.document.location.href.split('/');
        const protocol = pathArray[0];
        const host = pathArray[2];

        return `${environment.baseAddress}/signalr`;
    }
}
