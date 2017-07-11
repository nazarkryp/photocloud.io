import { Injectable } from '@angular/core';

import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Post } from '../common/models/post';
import { Pagination } from '../common/models/pagination';
import { CollectionModel } from '../common/models/collection-model';

import { TokenProvider } from '../infrastructure/communication/token-provider';

import { WebApiClient } from '../infrastructure/communication/webapi-client';

@Injectable()
export class PostService {
    constructor(private http: WebApiClient, private tokenProvider: TokenProvider) { }

    getPosts(pagination: Pagination) {
        let requestUri = 'https://krypapp.azurewebsites.net/posts';

        if (pagination != null && pagination.next != null) {
            requestUri = requestUri + '&next=' + pagination.next;
        }

        const accessToken = this.tokenProvider.getAccessToken();

        return this.http.get(requestUri)
            .then(response => response.json() as CollectionModel<Post>)
            .catch(this.handleError);
    }

    getUserPosts(username: string, pagination: Pagination) {
        let requestUri = 'https://krypapp.azurewebsites.net/posts/' + username;

        if (pagination != null && pagination.next != null) {
            requestUri = requestUri + '&next=' + pagination.next;
        }

        const accessToken = this.tokenProvider.getAccessToken();

        return this.http.get(requestUri)
            .then(response => response.json() as CollectionModel<Post>)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}
