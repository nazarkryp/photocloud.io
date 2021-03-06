import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

export abstract class HttpErrorFilter {
    public abstract handle(response: HttpErrorResponse): Observable<HttpErrorResponse>;
}
