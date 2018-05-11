import { Injectable } from '@angular/core';

import * as $ from 'jquery';

function _notificationsHub() {
    const _jQuery: any = $;
    return _jQuery.connection.notificationsHub;
}

@Injectable()
export class HubConnectionService {
    private hub: any;

    constructor() {
        this.hub = _notificationsHub;
    }

    public start() {
        console.log(this.hub());

        // this.connection.hub.start().done(() => {
        //     console.log('SignalR Connection Started...');
        // });
    }
}
