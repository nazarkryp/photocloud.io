import { User } from './user';

export class Comment {
    id: number;
    text: string;
    date: Date;
    user: User;
}
