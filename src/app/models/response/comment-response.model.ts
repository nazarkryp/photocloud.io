import { UserResponse } from './user-response.model';

export class CommentResponse {
    public id: number;
    public text: string;
    public date: Date;
    public user: UserResponse;
}
