import { UserViewModel } from './user.model';
import { MediaViewModel } from './media.model';
import { CommentViewModel } from './comment.model';

export class ActivityViewModel {
    public user: UserViewModel;
    public activityType: number;
    public date: Date;
    public media: MediaViewModel;
    public comment: CommentViewModel;
}
