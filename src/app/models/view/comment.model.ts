import { UserViewModel } from './user.model';

export class CommentViewModel {
    public id: number;
    public text: string;
    public date: Date;
    public user: UserViewModel;
}
