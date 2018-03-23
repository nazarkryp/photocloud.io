import { Injectable } from '@angular/core';

import { HttpClient, HttpRequest, HttpHeaders, HttpEvent, HttpEventType, HttpProgressEvent, HttpResponseBase } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { finalize, map, tap } from 'rxjs/operators';

import { WebApiService } from './communication';
import { AttachmentViewModel } from 'app/models/view';
import { AttachmentMapper } from 'app/infrastructure/mapping';
import { AttachmentResponse } from 'app/models/response';

@Injectable()
export class Uploader {
    private _isUploading: boolean;
    private _progress: number;
    private _completed = false;

    constructor(
        private mapper: AttachmentMapper,
        private client: WebApiService) {
    }

    public upload(file: File): Observable<AttachmentViewModel> {
        this.reset();

        const formData = new FormData();
        formData.append('image', file, file.name);

        const headers = new HttpHeaders();

        return this.client.postWithProgress<AttachmentResponse>('/attachments', formData, this.onProgressChanged.bind(this), this.onCompleted.bind(this))
            .map(response => this.mapper.mapFromResponse(response));
    }

    public get progress(): number {
        return this._progress;
    }

    public get completed(): boolean {
        return this._completed;
    }

    private onProgressChanged(event: HttpProgressEvent) {
        if (!event.total) {
            return null;
        }

        this._progress = (event.loaded * 100) / event.total;
    }

    private onCompleted(response: HttpResponseBase) {
        this._completed = true;
    }

    private reset() {
        this._completed = false;
        this._progress = null;
    }
}
