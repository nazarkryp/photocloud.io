import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { WebApiClient } from 'app/infrastructure/communication';
import { UserMapper, PageMapper } from 'app/infrastructure/mapping';

import { PageViewModel, PaginationViewModel, UserViewModel } from 'app/models/view';
import { ValidationResult } from 'app/models/common';
import { UserResponse } from 'app/models/response';

@Injectable()
export class UserService {
    private pageMapper: PageMapper<UserResponse, UserViewModel>;

    constructor(
        private webApiClient: WebApiClient,
        private userMapper: UserMapper) {
        this.pageMapper = new PageMapper<UserResponse, UserViewModel>(this.userMapper);
    }

    public getUser(username: string): Observable<UserViewModel> {
        return this.webApiClient.get<UserResponse>(`users/${username}`)
            .map(response => {
                return this.userMapper.mapFromResponse(response);
            });
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

        return this.webApiClient.get<PageViewModel<UserResponse>>(requestUri)
            .map(page => {
                const pageViewModel = this.pageMapper.mapFromResponse(page);
                return pageViewModel;
            });
    }

    public searchUsers(query: string): Observable<PageViewModel<UserViewModel>> {
        return this.webApiClient.get(`users/search?query=${query}`);
    }

    public getIncommingRequests(): Observable<UserViewModel[]> {
        return this.webApiClient.get<UserResponse[]>('users/requests/incomming')
            .map(response => {
                return this.userMapper.mapFromResponseArray(response);
            });
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
