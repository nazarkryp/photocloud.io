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
        return this.progress.isStarted();
    }

    public start() {
        this.progress.start();
    }

    public complete() {
        this.progress.complete();
    }
}
