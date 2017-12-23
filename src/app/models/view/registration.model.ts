export class RegistrationViewModel {
    public username: string;
    public email: string;
    public password: string;
    public confirmPassword: string;

    constructor(username?: string, email?: string, password?: string, confirmPassword?: string) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }
}
