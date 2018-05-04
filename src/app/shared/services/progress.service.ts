import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ProgressService {
    private _isLoading: boolean;

    public start() {
        this._isLoading = true;
    }

    public complete() {
        this._isLoading = false;
    }

    public get isLoading(): boolean {
        return this._isLoading;
    }

    public isStarted(): boolean { return this._isLoading; }
}
