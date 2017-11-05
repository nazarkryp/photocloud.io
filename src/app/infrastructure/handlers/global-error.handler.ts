import { ErrorHandler, Injectable } from '@angular/core';

export class GlobalErrorHandler implements ErrorHandler {
    public handleError(error: any): void {
        console.log(error);
    }
}
