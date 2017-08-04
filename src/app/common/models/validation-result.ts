import { Error } from './error';

export class ValidationResult {
    public hasErrors: boolean;
    public error: Error;
    constructor(success?: boolean, error?: Error) { }
}
