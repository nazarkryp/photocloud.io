import { Injectable } from '@angular/core';

import { HttpClient, HttpRequest, HttpHeaders, HttpEvent, HttpEventType, HttpProgressEvent, HttpResponseBase } from '@angular/common/http';

import { Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';

import { WebApiService } from './communication';
import { AttachmentViewModel } from 'app/models/view';
import { AttachmentMapper } from 'app/infrastructure/mapping';
import { AttachmentResponse } from 'app/models/response';

@Injectable()
export class Uploader {
    private uploaders: Uploader[];

    private _isUploading: boolean;
    private _progress: number;
    private _completed = false;

    constructor(
        private mapper: AttachmentMapper,
        private client: WebApiService) {
    }

    public create<T>(file: File): Upload<T> {
        const upload = new Upload<T>(file);

        this.handleUpload(upload);

        return upload;
    }

    public upload(file: File): Observable<AttachmentViewModel> {
        this.reset();

        const formData = new FormData();
        formData.append('image', file, file.name);

        return this.client.postWithProgress<AttachmentResponse>('/attachments', formData, this.onProgressChanged.bind(this), this.onCompleted.bind(this))
            .pipe(map(response => this.mapper.mapFromResponse(response)));
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

    private handleUpload<T>(upload: Upload<T>) {
        const formData = new FormData();
        formData.append('image', upload.file, upload.file.name);

        this.client.postWithProgress<T>('/attachments', formData, (event) => {
            if (!event.total) {
                upload.progress = null;
            } else {
                upload.progress = (event.loaded * 100) / event.total;
            }
        }, (response: HttpResponseBase) => {
            upload.completed = true;
        }).subscribe(response => {

        });
    }
}

export class Upload<T> {
    private _progress: number;
    private _completed: boolean;
    private _content: T;

    constructor(
        public readonly file: File) { }

    public get progress(): number {
        return this._progress;
    }

    public set progress(value: number) {
        this._progress = value;
    }

    public get completed(): boolean {
        return this._completed;
    }

    public set completed(value: boolean) {
        this._completed = value;
    }

    public get content(): T {
        return this._content;
    }
    public set content(v: T) {
        this._content = v;
    }
}
