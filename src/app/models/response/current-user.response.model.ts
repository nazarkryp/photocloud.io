export class CurrentUserResponse {
    public id: number;
    public username: string;
    public fullName: string;
    public email: string;
    public bio: string;
    public pictureUri: string;
    public isPrivate: boolean;
    public isActive: boolean;

    constructor(
        id?: number,
        username?: string,
        fullName?: string,
        email?: string,
        bio?: string,
        isPrivate?: boolean,
        isActive?: boolean,
        pictureUri?: string) {
        this.id = id;
        this.username = username;
        this.fullName = fullName;
        this.bio = bio;
        this.email = email;
        this.isPrivate = isPrivate;
        this.isActive = isActive;
        this.pictureUri = pictureUri;
    }
}
