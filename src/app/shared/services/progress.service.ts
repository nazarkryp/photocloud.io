import { Injectable } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';

@Injectable({
    providedIn: 'root'
})
export class ProgressService {
    constructor(
        private progress: NgProgress) {
    }

    public get isLoading(): boolean {
        return this.progress.ref().isStarted;
    }

    public start() {
        this.progress.ref().start();
    }

    public complete() {
        this.progress.ref().complete();
    }
}
