import { RelationshipStatus } from './relationship-status';

export class User {
    id: number;
    username: string;
    fullName: string;
    bio: string;
    email: string;
    isPrivate: boolean;
    isActive: boolean;
    pictureUri: string;
    posts: number;
    followers: number;
    following: number;
    outgoingStatus: number;
    incommingStatus: number;
}
