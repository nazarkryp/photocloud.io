import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { MemoryCache } from 'app/infrastructure/caching';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
    constructor(
        private cache: MemoryCache,
        private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.method !== 'GET' || !req.url.includes('v1/media')) {
            return next.handle(req);
        }

        const cachedResponse = this.cache.get(req);
        if (cachedResponse) {
            return of(cachedResponse);
        }

        return next.handle(req).pipe(tap(event => {
            if (event instanceof HttpResponse) {
                this.cache.put(req, event);
            }
        }));
    }
}
