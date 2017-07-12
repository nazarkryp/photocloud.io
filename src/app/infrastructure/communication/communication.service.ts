import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CommunicationService {
    private $state = new BehaviorSubject<any>('defaultState');

    changeState(stateObject: any) {
        this.$state.next(stateObject);
    }

    getState() {
        return this.$state.asObservable();
    }
}
