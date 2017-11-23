import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

export abstract class HttpErrorFilter {
    public abstract handle(response: HttpErrorResponse): ErrorObservable;
}
