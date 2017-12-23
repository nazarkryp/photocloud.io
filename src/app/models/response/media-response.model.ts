import { AttachmentResponse } from './attachment-response.model';
import { UserResponse } from './user-response.model';
import { CommentResponse } from './comment-response.model';

export class MediaResponse {
    public id: number;
    public caption: string;
    public userHasLiked: boolean;
    public allowComments: boolean;
    public likesCount: number;
    public created: Date;
    public commentsCount: number;
    public attachments: AttachmentResponse[];
    public comments: CommentResponse[];
    public user: UserResponse;
    public likes: UserResponse[];
}
