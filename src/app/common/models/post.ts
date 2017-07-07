import { Attachment } from './attachment';

export class Post {
    constructor() {
        this.activeAttachment = 0;
    }

    id: number;
    caption: string;
    userHasLiked: boolean;
    allowComments: boolean;
    likesCount: number;
    commentsCount: number;
    created: Date;
    attachments: Attachment[];
    activeAttachment: number;
}
