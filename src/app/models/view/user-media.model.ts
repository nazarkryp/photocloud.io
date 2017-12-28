import { PageViewModel } from './page.model';
import { MediaViewModel } from './media.model';
import { UserViewModel } from './user.model';
import { ErrorViewModel } from './error.model';

export class UserMediaViewModel {
    public user: UserViewModel;
    public page: PageViewModel<MediaViewModel>;
    public error: ErrorViewModel;

    constructor() {
        this.page = new PageViewModel<MediaViewModel>();
    }
}
