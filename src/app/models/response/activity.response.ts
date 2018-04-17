import { UserResponse } from './user-response.model';
import { MediaResponse } from './media-response.model';

export class ActivityResponse {
    public user: UserResponse;
    public activityType: number;
    public date: Date;
    public media: MediaResponse;
}
