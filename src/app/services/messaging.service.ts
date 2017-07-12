import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/';
import { Subject } from 'rxjs/Subject';

import { AccessToken } from '../common/models/token';

@Injectable()
export class MessagingService {
    private subject = new Subject<any>();

    sendMessage(message: AccessToken) {
        this.subject.next(message);
    }

    clearMessage() {
        this.subject.next();
    }

    getMessage(): Observable<AccessToken> {
        return this.subject.asObservable();
    }
}
