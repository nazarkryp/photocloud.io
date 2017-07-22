import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { WebApiClient } from '../infrastructure/communication';

import { User } from '../common/models/user';
import { UserMapper } from '../infrastructure/mapping/user.mapper';

@Injectable()
export class UserService {
    constructor(
        private webApiClient: WebApiClient,
        private userMapper: UserMapper) { }

    getUser(username: string): Observable<User> {
        return this.webApiClient.get<any>(`users/${username}`)
            .map(response => this.userMapper.mapResponseToUser(response));
    }

    modifyRelationship(userId: number, relationshipModel: any): Observable<User> {
        return this.webApiClient.put(`users/${userId}/relationship`, relationshipModel)
            .map(response => this.userMapper.mapResponseToUser(response));
    }
}
