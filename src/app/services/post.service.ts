import { Injectable } from '@angular/core';

import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Post } from '../common/models/post';
import { Pagination } from '../common/models/pagination';
import { CollectionModel } from '../common/models/collection-model';

import { TokenService } from '../infrastructure/security/token.service';

import { WebApiClient } from '../infrastructure/communication/http';

@Injectable()
export class PostService {
    constructor(private http: WebApiClient, private tokenService: TokenService) { }

    getPosts(pagination: Pagination): Promise<CollectionModel<Post>> {
        let requestUri = 'posts';

        if (pagination != null && pagination.next != null) {
            requestUri = requestUri + '?next=' + pagination.next;
        }

        return this.http.get(requestUri)
            .then(response => response.json() as CollectionModel<Post>)
            .catch(this.handleError);
    }

    getUserPosts(username: string, pagination: Pagination): Promise<CollectionModel<Post>> {
        let requestUri = 'posts/' + username;

        if (pagination != null && pagination.next != null) {
            requestUri = requestUri + '?next=' + pagination.next;
        }

        return this.http.get(requestUri)
            .then(response => response.json() as CollectionModel<Post>)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}
