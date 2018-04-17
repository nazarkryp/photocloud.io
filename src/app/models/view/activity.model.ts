import { UserViewModel } from './user.model';
import { MediaViewModel } from './media.model';

export class ActivityViewModel {
    public user: UserViewModel;
    public activityType: number;
    public date: Date;
    public media: MediaViewModel;
}
