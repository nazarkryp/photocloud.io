import { Injectable } from '@angular/core';

import { HttpClient } from '../infrastructure/communication/http';

import { User } from '../common/models/user';
import { UserMapper } from '../infrastructure/mapping/user.mapper';

@Injectable()
export class UserService {
    constructor(
        private httpClient: HttpClient,
        private userMapper: UserMapper) { }

    getUser(username: string): Promise<User> {
        return this.httpClient.get(`users/${username}`)
            .then(response => this.userMapper.mapResponseToUser(response.json()))
            .catch(this.handleError);
    }

    modifyRelationship(userId: number, relationshipModel: any) {
        return this.httpClient.put(`users/${userId}/relationship`, relationshipModel)
            .then(response => { })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}
