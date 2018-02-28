import { Observable } from 'rxjs/Observable';

import { UserViewModel, PageViewModel, PaginationViewModel } from 'app/models/view';

export class UserDialogDetails {
    public handler: (userId: number, pagination: PaginationViewModel) => Observable<PageViewModel<UserViewModel>>;
    public title: string;
    public identifier: number;

    constructor(title: string, handler: (userId: number, pagination: PaginationViewModel) => Observable<PageViewModel<UserViewModel>>, userId: number) {
        this.title = title;
        this.handler = handler;
        this.identifier = userId;
    }
}
