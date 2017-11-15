export class TokenResponse {
    public tokenType: string;
    public accessToken: string;
    public refreshToken: string;
    public expires: Date;
    public issued: Date;
    public expiresIn: number;
    public isActive: boolean;
    public isPrivate: boolean;
    public pictureUri: string;
    public userId: number;
    public username: number;
}
