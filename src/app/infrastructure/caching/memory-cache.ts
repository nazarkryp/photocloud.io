import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

import { IHttpCache } from './http-cache';
import { LocalStorageService } from 'app/infrastructure/services/storage';

@Injectable()
export class MemoryCache implements IHttpCache {
    private dictionary: { [key: string]: Cache } = {};

    constructor(
        private storageService: LocalStorageService) {
    }

    public get(req: HttpRequest<any>): HttpResponse<any> {
        return null;
    }

    public put(req: HttpRequest<any>, resp: HttpResponse<any>): void {
    }
}
