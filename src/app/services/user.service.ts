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

    public getUser(username: string): Observable<User> {
        return this.webApiClient.get<User>(`users/${username}`)
            .map(response => this.userMapper.mapResponseToUser(response));
    }

    public getIncommingRequests() {
        return this.webApiClient.get<User[]>('users/requests/incomming');
    }

    public modifyRelationship(userId: number, relationshipModel: any): Observable<User> {
        return this.webApiClient.put(`users/${userId}/relationship`, relationshipModel)
            .map(response => this.userMapper.mapResponseToUser(response));
    }
}
