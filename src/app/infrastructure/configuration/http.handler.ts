import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { HttpErrorFilter } from 'app/infrastructure/filters/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class HttpErrorHandler {
    public filters: HttpErrorFilter[] = new Array<HttpErrorFilter>();

    public add(filter: HttpErrorFilter) {
        if (!this.filters.some(e => typeof (e) === typeof (filter))) {
            this.filters.push(filter);
        }
    }

    public handle(httpErrorResponse: HttpErrorResponse): ErrorObservable | Observable<HttpErrorResponse> {
        for (const filter of this.filters) {
            const error = filter.handle(httpErrorResponse);

            if (error) {
                return error;
            }
        }

        return null;
    }
}
