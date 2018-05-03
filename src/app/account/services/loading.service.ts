import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class LoadingService {
    private _isLoading: BehaviorSubject<boolean>;

    constructor() {
        this._isLoading = new BehaviorSubject<boolean>(false);
    }

    public get isLoading(): Observable<boolean> {
        return this._isLoading.asObservable();
    }

    public start() {
        this._isLoading.next(true);
    }

    public done() {
        this._isLoading.next(false);
    }
}
