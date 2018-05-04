import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ProgressService {
    public start() { }
    public complete() { }
    public isStarted(): boolean { return false; }
}
