import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { HttpErrorFilter } from '../filters/http';

@Injectable()
export class HttpConfiguration {
    public filters: HttpErrorFilter[] = new Array<HttpErrorFilter>();
}
