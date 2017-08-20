export class CurrentUser {
    public id: number;
    public username: string;
    public isPrivate: boolean;
    public isActive: boolean;
    public pictureUri: string;

    constructor(
        id?: number,
        username?: string,
        isPrivate?: boolean,
        isActive?: boolean,
        pictureUri?: string) {
        this.id = id;
        this.username = username;
        this.isPrivate = isPrivate;
        this.isActive = isActive;
        this.pictureUri = pictureUri;
    }
}
