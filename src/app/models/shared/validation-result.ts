import { ErrorViewModel } from '../view/error.model';

export class ValidationResult {
    public hasErrors: boolean;
    public error: ErrorViewModel;
    constructor(success?: boolean, error?: Error) { }
}
