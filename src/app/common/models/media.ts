import { Attachment } from './attachment';
import { Comment } from './comment';
import { User } from './user';

export class Media {
    id: number;
    caption: string;
    userHasLiked: boolean;
    allowComments: boolean;
    likesCount: number;
    commentsCount: number;
    created: Date;
    attachments: Attachment[];
    activeAttachment: number;
    comments: Comment[];
    user: User;
    likes: User[];
    isLoading: boolean;
    editing: boolean;
}
