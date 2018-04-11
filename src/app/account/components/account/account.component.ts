import { Component, AfterViewInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';

import { LoadingService } from 'app/account/services';

import { NgProgress } from 'ngx-progressbar';

@Component({
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent implements AfterViewChecked, AfterViewInit {
    private _isLoading: boolean;

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private loadingService: LoadingService,
        private progress: NgProgress) {
    }

    public get isLoading(): boolean {
        return this._isLoading;
    }

    public set isLoading(value: boolean) {
        this._isLoading = value;
    }

    public ngAfterViewInit(): void {
        this.loadingService.isLoading.subscribe(isLoading => {
            this.isLoading = isLoading;

            if (isLoading) {
                this.progress.start();
            } else {
                this.progress.done();
            }
        });
    }

    public ngAfterViewChecked(): void {
        this.changeDetectorRef.detectChanges();
    }
}
