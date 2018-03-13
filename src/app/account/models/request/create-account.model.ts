export class CreateAccountRequestModel {
    public username: string;
    public fullName: string;
    public email: string;
    public password: string;
    public signInOnCreated = true;

    constructor(username: string, email: string, password: string, fullName?: string) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.fullName = fullName;
    }
}
