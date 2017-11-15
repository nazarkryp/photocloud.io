export class CreateAccountRequestModel {
    public username: string;
    public fullName: string;
    public email: string;
    public password: string;

    constructor(username: string, email: string, password: string, fullName?: string) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.fullName = fullName;
    }
}
