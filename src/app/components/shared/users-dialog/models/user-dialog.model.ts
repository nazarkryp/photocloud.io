import { Observable } from 'rxjs/Observable';

import { UserViewModel, Page, PaginationViewModel } from 'app/models/view';

export class UserDialogDetails {
    public handler: (userId: number, pagination: PaginationViewModel) => Observable<Page<UserViewModel>>;
    public title: string;
    public identifier: number;

    constructor(title: string, handler: (userId: number, pagination: PaginationViewModel) => Observable<Page<UserViewModel>>, userId: number) {
        this.title = title;
        this.handler = handler;
        this.identifier = userId;
    }
}
