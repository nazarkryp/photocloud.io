import { UserResponse } from './user-response.model';
import { MediaResponse } from './media-response.model';
import { CommentResponse } from './comment-response.model';

export class ActivityResponse {
    public id: number;
    public user: UserResponse;
    public activityType: number;
    public date: Date;
    public media: MediaResponse;
    public comment: CommentResponse;
}
