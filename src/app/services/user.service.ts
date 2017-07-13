import { Injectable } from '@angular/core';

import { HttpClient } from '../infrastructure/communication/http';

import { User } from '../common/models/user';

@Injectable()
export class UserService {
    constructor(private httpClient: HttpClient) { }

    getUser(username: string): Promise<User> {
        return this.httpClient.get(`users/${username}`)
            .then(response => response.json() as User)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}
