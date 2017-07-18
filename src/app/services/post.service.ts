import { Injectable } from '@angular/core';

import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Post } from '../common/models/post';
import { Pagination } from '../common/models/pagination';
import { Collection } from '../common/models/collection-model';

import { TokenService } from '../infrastructure/security/token.service';

import { WebApiClient } from '../infrastructure/communication/http';

@Injectable()
export class PostService {
    constructor(private http: WebApiClient, private tokenService: TokenService) { }

    getPosts(pagination: Pagination): Promise<Collection<Post>> {
        let requestUri = 'posts';

        if (pagination != null && pagination.next != null) {
            requestUri = requestUri + '?next=' + pagination.next;
        }

        return this.http.get(requestUri)
            .then(response => response as Collection<Post>)
            .catch(error => this.handleError(error));
    }

    getUserPosts(username: string, pagination: Pagination): Promise<Collection<Post>> {
        let requestUri = 'posts/' + username;

        if (pagination != null && pagination.next != null) {
            requestUri = requestUri + '?next=' + pagination.next;
        }

        return this.http.get(requestUri)
            .then(response => response as Collection<Post>)
            .catch(error => this.handleError(error));
    }

    getPostById(postId: number): Promise<Post> {
        return this.http.get(`posts/${postId}`)
            .then(response => response as Post)
            .catch(error => this.handleError(error));
    }

    removePost(postId: number) {
        return this.http.delete(`posts/${postId}`)
            .then(response => { })
            .catch(error => this.handleError(error));
    }

    likePost(postId: number) {
        return this.http.post(`posts/${postId}/likes`, null)
            .then(response => { })
            .catch(error => this.handleError(error));
    }

    removePostLike(postId: number) {
        return this.http.delete(`posts/${postId}/likes`)
            .then(response => { })
            .catch(error => this.handleError(error));
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}
