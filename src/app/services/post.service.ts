import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { WebApiClient } from '../infrastructure/communication';
import { Collection, Pagination, Post, CreatePostModel } from '../common/models';

@Injectable()
export class PostService {
    constructor(
        private webApiClient: WebApiClient) { }

    createPost(post: CreatePostModel) {
        return this.webApiClient.post<Post>('posts', post);
    }

    getPosts(pagination: Pagination): Observable<Collection<Post>> {
        let requestUri = 'posts';

        if (pagination != null && pagination.next != null) {
            requestUri = requestUri + '?next=' + pagination.next;
        }

        return this.webApiClient.get<Collection<Post>>(requestUri);
    }

    getUserPosts(username: string, pagination: Pagination): Observable<Collection<Post>> {
        let requestUri = 'posts/' + username;

        if (pagination != null && pagination.next != null) {
            requestUri = requestUri + '?next=' + pagination.next;
        }

        return this.webApiClient.get<Collection<Post>>(requestUri);
    }

    getPostsByTag(tag: string, pagination: Pagination) {
        let requestUri = `posts/tags/${tag}`;

        if (pagination != null && pagination.next != null) {
            requestUri = requestUri + '?next=' + pagination.next;
        }

        console.log(requestUri);

        return this.webApiClient.get<Collection<Post>>(requestUri);
    }

    getPostById(postId: number): Observable<Post> {
        return this.webApiClient.get<Post>(`posts/${postId}`);
    }

    update(post: Post): Observable<Post> {
        return this.webApiClient.patch(`posts/${post.id}`, post);
    }

    removePost(postId: number) {
        return this.webApiClient.delete(`posts/${postId}`);
    }

    likePost(postId: number) {
        return this.webApiClient.post(`posts/${postId}/likes`, null);
    }

    removePostLike(postId: number) {
        return this.webApiClient.delete(`posts/${postId}/likes`);
    }
}
