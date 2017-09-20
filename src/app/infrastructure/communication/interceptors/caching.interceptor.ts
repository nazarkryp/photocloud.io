import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { MemoryCache } from '../../cache/memory-cache';

import { Observable } from 'rxjs/Rx';
import { ErrorObservable } from 'rxjs/Observable/ErrorObservable';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
    constructor(
        private cache: MemoryCache,
        private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.method !== 'GET' || !req.url.includes('api/posts')) {
            return next.handle(req);
        }

        const cachedResponse = this.cache.get(req);
        if (cachedResponse) {
            return Observable.of(cachedResponse);
        }

        return next.handle(req).do(event => {
            if (event instanceof HttpResponse) {
                this.cache.put(req, event);
            }
        });
    }
}
