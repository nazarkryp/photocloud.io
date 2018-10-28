import { Page } from './page.model';
import { MediaViewModel } from './media.model';
import { UserViewModel } from './user.model';
import { ErrorViewModel } from './error.model';

export class UserMediaViewModel {
    public user: UserViewModel;
    public media: Page<MediaViewModel>;
    public error: ErrorViewModel;

    constructor() {
        this.media = new Page<MediaViewModel>();
    }
}
