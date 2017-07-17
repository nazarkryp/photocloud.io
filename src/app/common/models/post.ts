import { Attachment } from './attachment';
import { Comment } from './comment';
import { User } from './user';

export class Post {
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
    likes: User[];
    isLoading: boolean;
}
