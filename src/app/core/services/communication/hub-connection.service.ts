import { Injectable, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { Observable } from 'rxjs';

import { environment } from 'app/../environments/environment';
import { TokenProvider } from 'app/infrastructure/security';

declare var $: any;

function connection() {
    return $.connection;
}

@Injectable()
export class HubConnectionService {
    private hub: any;
    private notifications: any;
    private started: boolean;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private tokenProvider: TokenProvider) {
        this.hub = connection().hub;
        this.hub.url = this.connectionUri;
        this.notifications = connection().notificationsHub;
    }

    public start() {
        const accessToken = this.tokenProvider.retrieveAccessToken();

        if (accessToken && accessToken.accessToken) {
            $.signalR.ajaxDefaults.headers = {
                Authorization: `Bearer ${accessToken.accessToken}`
            };

            // this.hub.start().done(() => {
            //     this.started = true;
            //     console.log('Real-time notifications working');
            // }).fail((error) => {
            //     console.log(error);
            // });
        }
    }

    public get<T>(callbackName: string) {
        const observable: Observable<T> = Observable.create(observer => {
            if (!this.started) {
                this.hub.start().done(() => {
                    this.started = true;
                    console.log('Real-time notifications working');
                    this.notifications.client[callbackName] = (data) => {
                        console.log(data);
                        observer.next(data);
                    };
                }).fail((error) => {
                    console.log(error);
                });
            } else {
                this.notifications.client[callbackName] = (data) => {
                    observer.next(data);
                };
            }
        });

        return observable;
    }

    private get connectionUri(): string {
        const pathArray = this.document.location.href.split('/');
        const protocol = pathArray[0];
        const host = pathArray[2];

        return `${environment.baseAddress}/signalr`;
    }

    // private append() {
    //     const script = document.createElement('script');
    //     script.src = `${this.connectionUri}/hubs`;
    //     document.getElementsByTagName('head')[0].appendChild(script);
    // }
}
