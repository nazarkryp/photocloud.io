import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { WebApiClient } from 'app/infrastructure/communication';
import { UserMapper } from 'app/infrastructure/mapping';

import { PageViewModel, PaginationViewModel, UserViewModel } from 'app/models/view';
import { ValidationResult } from 'app/models/common';

@Injectable()
export class UserService {
    constructor(
        private webApiClient: WebApiClient,
        private userMapper: UserMapper) { }

    public getUser(username: string): Observable<UserViewModel> {
        return this.webApiClient.get<UserViewModel>(`users/${username}`);
    }

    public checkIfUserExists(username: string): Observable<boolean> {
        return this.webApiClient.get<ValidationResult>(`users/${username}/validate`)
            .map(data => {
                return data.success;
            });
    }

    public getUsers(pagination: PaginationViewModel): Observable<PageViewModel<UserViewModel>> {
        let requestUri = 'users';

        if (pagination != null && pagination.next != null) {
            requestUri = requestUri + '?next=' + pagination.next;
        }

        return this.webApiClient.get<PageViewModel<UserViewModel>>(requestUri);
    }

    public searchUsers(query: string): Observable<PageViewModel<UserViewModel>> {
        return this.webApiClient.get(`users/search?query=${query}`);
    }

    public getIncommingRequests(): Observable<UserViewModel[]> {
        return this.webApiClient.get<UserViewModel[]>('users/requests/incomming');
    }

    public getOutgoingRequests(): Observable<UserViewModel[]> {
        return this.webApiClient.get<UserViewModel[]>('users/requests/outgoing');
    }

    public modifyRelationship(userId: number, relationshipModel: any): Observable<UserViewModel> {
        return this.webApiClient.put<UserViewModel>(`users/${userId}/relationship`, relationshipModel);
    }

    public getFollowers(userId: number): Observable<UserViewModel[]> {
        return this.webApiClient.get<UserViewModel[]>(`users/${userId}/followers`);
    }

    public getFollowings(userId: number): Observable<UserViewModel[]> {
        return this.webApiClient.get<UserViewModel[]>(`users/${userId}/following`);
    }
}
