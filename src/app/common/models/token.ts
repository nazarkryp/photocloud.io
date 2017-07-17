export class AccessToken {
    userId: number;
    username: string;
    pictureUri: string;
    isPrivate: boolean;
    isActive: boolean;
    refreshToken: string;
    accessToken: string;
    tokenType: string;
    expiresIn: number;
    issued: Date;
    expires: Date;
}
