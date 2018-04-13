import { UserResponse } from './user-response.model';

export class ActivityResponse {
    public user: UserResponse;
    public activityType: number;
    public date: Date;
}
