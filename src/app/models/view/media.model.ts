import { AttachmentViewModel } from './attachment.model';
import { CommentViewModel } from './comment.model';
import { UserViewModel } from './user.model';

export class MediaViewModel {
    private _created: Date;

    public id: number;
    public caption: string;
    public userHasLiked: boolean;
    public allowComments: boolean;
    public likesCount: number;
    public commentsCount: number;
    public attachments: AttachmentViewModel[];
    public activeAttachment: number;
    public comments: CommentViewModel[];
    public user: UserViewModel;
    public likes: UserViewModel[];
    public editing = false;

    public get created(): Date {
        return this._created;
    }

    public set created(created: Date) {
        const newDate = new Date(created.getTime() + created.getTimezoneOffset() * 60 * 1000);
        const offset = created.getTimezoneOffset() / 60;
        const hours = created.getHours();
        newDate.setHours(hours - offset);
        this._created = newDate;
    }
}
