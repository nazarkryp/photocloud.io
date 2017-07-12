export class AccessToken {
    userId: number;
    username: string;
    pictureUri: string;
    isPrivate: Boolean;
    isActive: Boolean;
    refreshToken: string;
    accessToken: string;
    tokenType: string;
    expiresIn: number;
    issued: Date;
    expires: Date;
}
