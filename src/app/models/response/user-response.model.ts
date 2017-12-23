export class UserResponse {
    public id: number;
    public username: string;
    public fullName: string;
    public bio: string;
    public email: string;
    public isPrivate: boolean;
    public isActive: boolean;
    public pictureUri: string;
    public posts: number;
    public lastActive: Date;
    public followers: number;
    public following: number;
    public outgoingStatus: number;
    public incommingStatus: number;
}
