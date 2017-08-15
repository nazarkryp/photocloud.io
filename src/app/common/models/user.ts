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
    outgoingStatus: RelationshipStatus;
    incommingStatus: RelationshipStatus;
    posts: number;
    followers: number;
    following: number;
}
