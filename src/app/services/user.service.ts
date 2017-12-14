import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { WebApiClient } from '../infrastructure/communication';

import { Page, Pagination, User } from '../common/models';
import { UserMapper } from '../infrastructure/mapping/user.mapper';

@Injectable()
export class UserService {
    constructor(
        private webApiClient: WebApiClient,
        private userMapper: UserMapper) { }

    public getUser(username: string): Observable<User> {
        return this.webApiClient.get<User>(`users/${username}`);
    }

    public getUsers(pagination: Pagination): Observable<Page<User>> {
        let requestUri = 'users';

        if (pagination != null && pagination.next != null) {
            requestUri = requestUri + '?next=' + pagination.next;
        }

        return this.webApiClient.get<Page<User>>(requestUri);
    }

    public searchUsers(query: string): Observable<Page<User>> {
        return this.webApiClient.get(`users/search?query=${query}`);
    }

    public getIncommingRequests(): Observable<User[]> {
        return this.webApiClient.get<User[]>('users/requests/incomming');
    }

    public getOutgoingRequests(): Observable<User[]> {
        return this.webApiClient.get<User[]>('users/requests/outgoing');
    }

    public modifyRelationship(userId: number, relationshipModel: any): Observable<User> {
        return this.webApiClient.put<User>(`users/${userId}/relationship`, relationshipModel);
    }

    public getFollowers(userId: number): Observable<User[]> {
        return this.webApiClient.get<User[]>(`users/${userId}/followers`);
    }

    public getFollowings(userId: number): Observable<User[]> {
        return this.webApiClient.get<User[]>(`users/${userId}/following`);
    }
}
