import { UserViewModel } from './user.model';
import { MediaViewModel } from './media.model';

export class ActivityViewModel {
    public user: UserViewModel;
    public activityType: number;
    public date: Date;
    public media: MediaViewModel;
    public get mediaThumbnail(): string {
        const attachment = this.media.attachments.find(e => e.type === 0);

        if (attachment) {
            return attachment.uri;
        }

        return '';
    }
}
