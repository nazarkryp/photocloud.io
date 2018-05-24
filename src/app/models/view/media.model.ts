import { AttachmentViewModel } from './attachment.model';
import { CommentViewModel } from './comment.model';
import { UserViewModel } from './user.model';

export class MediaViewModel {
    private _created: Date;
    private _attachments: AttachmentViewModel[];

    public id: number;
    public caption: string;
    public userHasLiked: boolean;
    public allowComments: boolean;
    public likesCount: number;
    public commentsCount: number;
    public activeAttachment = 0;
    public comments: CommentViewModel[];
    public user: UserViewModel;
    public likes: UserViewModel[];
    public editing = false;
    public inspectingLikes = false;
    public coverId: number;

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

    public get attachments(): AttachmentViewModel[] {
        return this._attachments;
    }

    public set attachments(attachments: AttachmentViewModel[]) {
        this._attachments = attachments;
        this.moveCoverToFront(this);
    }

    private moveCoverToFront(media: MediaViewModel) {
        if (!this.coverId || this.coverId === 0) {
            return;
        }

        let newIndex = 0;
        const index = media.attachments.findIndex(e => e.id === media.coverId);
        const attachment = media.attachments.find(e => e.id === media.coverId);

        if (index > -1 && index !== newIndex) {
            if (newIndex >= media.attachments.length) {
                newIndex = media.attachments.length;
            }

            const array = media.attachments.slice();

            array.splice(index, 1);
            array.splice(newIndex, 0, attachment);

            media.attachments = array;
        }
    }
}
