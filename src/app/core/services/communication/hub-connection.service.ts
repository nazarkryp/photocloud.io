import { Injectable, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { Observable, Observer, ReplaySubject } from 'rxjs';

import { environment } from 'app/../environments/environment';
import { TokenProvider } from 'app/infrastructure/security';

declare var $: any;

@Injectable()
export class HubConnectionService {
    private started: boolean;
    public connections: { [connectionName: string]: ReplaySubject<any> } = {};
    private state = new ReplaySubject<any>(1);
    private proxy: any;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private tokenProvider: TokenProvider) {
    }

    public start(): Observable<any> {
        const accessToken = this.tokenProvider.retrieveAccessToken();

        if (accessToken && accessToken.accessToken) {
            $.signalR.ajaxDefaults.headers = {
                Authorization: `Bearer ${accessToken.accessToken}`
            };
        }

        const connection = $.hubConnection(this.connectionUri, { useDefaultPath: false });
        this.proxy = connection.createHubProxy('notificationsHub');

        this.proxy.on('connected', (data) => { });

        return Observable.create((observer: Observer<any>) => {
            connection.start()
                .done(() => {
                    observer.next(true);
                })
                .fail(() => {
                    observer.error('Connection Error');
                });
        });
    }

    public stop() {
        console.log('Connection closed...');
        $.connection.hub.stop();
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
        // console.log($.connection.hub);
        // $.connection.notificationsHub.client.notifications = (data) => {
        //     this.state.next(data);
        // };
    }

    private get connectionUri(): string {
        const pathArray = this.document.location.href.split('/');
        const protocol = pathArray[0];
        const host = pathArray[2];

        return `${environment.baseAddress}/signalr`;
    }
}
