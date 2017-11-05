import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

import { IHttpCache } from './http-cache';

import { SessionService } from './../session/session.service';
import { AccessToken } from '../../common/models';

@Injectable()
export class MemoryCache implements IHttpCache {
    private dictionary: { [key: string]: Cache } = {};

    constructor(
        private sessionService: SessionService) {
        setInterval(() => this.clearCache(), 10000);
    }

    public get(req: HttpRequest<any>): HttpResponse<any> {
        const session = this.sessionService.getSession();
        if (!session) {
            return null;
        }

        const key = `${session.username}${req.url}`;
        const cache = this.dictionary[key];

        if (cache && this.isCacheValid(cache)) {
            return cache.content;
        }
    }

    public put(req: HttpRequest<any>, resp: HttpResponse<any>): void {
        const session = this.sessionService.getSession();
        const key = `${session.username}${req.url}`;
        if (session) {
            this.dictionary[key] = new Cache(key, resp, new Date());
        }
    }

    private clearCache() {
        // tslint:disable-next-line:forin
        for (const prop in this.dictionary) {
            const cache = this.dictionary[prop];
            if (!this.isCacheValid(cache)) {
                delete this.dictionary[prop];
            }
        }
    }

    private isCacheValid(cache: Cache) {
        const now = new Date();
        const elapsed = (now.getTime() - cache.date.getTime()) / 1000;

        return elapsed < 10;
    }
}

export class Cache {
    public key: string;
    public content: HttpResponse<any>;
    public date: Date;

    constructor(key: string, content: HttpResponse<any>, date: Date) {
        this.key = key;
        this.content = content;
        this.date = date;
    }
}
