import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { WebApiClient } from 'app/infrastructure/communication';
import { UserMapper, PageMapper } from 'app/infrastructure/mapping';

import { Page, PaginationViewModel, UserViewModel } from 'app/models/view';
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

    public getUsers(pagination: PaginationViewModel): Observable<Page<UserViewModel>> {
        let requestUri = 'users';

        if (pagination != null && pagination.next != null) {
            requestUri = requestUri + '?next=' + pagination.next;
        }

        return this.webApiClient.get<Page<UserResponse>>(requestUri)
            .map(page => {
                const pageViewModel = this.pageMapper.mapFromResponse(page);
                return pageViewModel;
            });
    }

    public searchUsers(query: string): Observable<Page<UserViewModel>> {
        return this.webApiClient.get(`users/search?query=${query}`);
    }

    public getIncommingRequests(pagination: PaginationViewModel): Observable<Page<UserViewModel>> {
        let requestUri = 'users/requests/incomming';

        if (pagination && pagination.next) {
            requestUri = `${requestUri}?next=${pagination.next}`;
        }

        return this.webApiClient.get<Page<UserResponse>>(requestUri)
            .map(response => {
                return this.pageMapper.mapFromResponse(response);
            });
    }

    public getOutgoingRequests(pagination: PaginationViewModel): Observable<Page<UserViewModel>> {
        let requestUri = 'users/requests/outgoing';

        if (pagination && pagination.next) {
            requestUri = `${requestUri}?next=${pagination.next}`;
        }

        return this.webApiClient.get<Page<UserResponse>>(requestUri)
            .map(response => {
                return this.pageMapper.mapFromResponse(response);
            });
    }

    public modifyRelationship(userId: number, relationshipModel: any): Observable<UserViewModel> {
        return this.webApiClient.put<UserViewModel>(`users/${userId}/relationship`, relationshipModel);
    }

    public getFollowers(userId: number, pagination: PaginationViewModel): Observable<Page<UserViewModel>> {
        let requestUri = `users/${userId}/followers`;

        if (pagination != null && pagination.next != null) {
            requestUri = requestUri + '?next=' + pagination.next;
        }

        return this.webApiClient.get<Page<UserResponse>>(requestUri)
            .map(response => {
                const page = this.pageMapper.mapFromResponse(response);

                return page;
            });
    }

    public getFollowings(userId: number, pagination: PaginationViewModel): Observable<Page<UserViewModel>> {
        let requestUri = `users/${userId}/following`;
        if (pagination != null && pagination.next != null) {
            requestUri = requestUri + '?next=' + pagination.next;
        }

        return this.webApiClient.get<Page<UserResponse>>(requestUri)
            .map(response => {
                const page = this.pageMapper.mapFromResponse(response);

                return page;
            });
    }
}
