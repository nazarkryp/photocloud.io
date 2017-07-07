import { Attachment } from './attachment';

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

    constructor() {
        this.activeAttachment = 0;
    }
}
