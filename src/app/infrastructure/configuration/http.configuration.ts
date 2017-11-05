import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { HttpErrorFilter } from 'app/infrastructure/filters/http';

@Injectable()
export class HttpConfiguration {
    public filters: HttpErrorFilter[] = new Array<HttpErrorFilter>();

    public add(filter: HttpErrorFilter) {
        if (!this.filters.some(e => typeof (e) === typeof (filter))) {
            this.filters.push(filter);
        }
    }
}
