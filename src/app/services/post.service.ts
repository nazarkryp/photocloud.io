import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { WebApiClient } from '../infrastructure/communication';
import { UserMapper } from '../infrastructure/mapping';
import { Collection, Pagination, Post, User, CreatePostModel } from '../common/models';

@Injectable()
export class PostService {
    constructor(
        private webApiClient: WebApiClient,
        private userMapper: UserMapper) { }

    public createPost(post: CreatePostModel) {
        return this.webApiClient.post<Post>('posts', post);
    }

    public getPosts(pagination: Pagination): Observable<Collection<Post>> {
        let requestUri = 'posts';

        if (pagination && pagination.next != null) {
            requestUri = requestUri + '?next=' + pagination.next;
        }

        return this.webApiClient.get<Collection<Post>>(requestUri);
    }

    public getUserPosts(username: string, pagination: Pagination): Observable<Collection<Post>> {
        let requestUri = 'posts/' + username;

        if (pagination != null && pagination.next != null) {
            requestUri = requestUri + '?next=' + pagination.next;
        }

        return this.webApiClient.get<Collection<Post>>(requestUri);
    }

    public getPostsByTag(tag: string, pagination: Pagination) {
        let requestUri = `posts/tags/${tag}`;

        if (pagination != null && pagination.next != null) {
            requestUri = requestUri + '?next=' + pagination.next;
        }

        return this.webApiClient.get<Collection<Post>>(requestUri);
    }

    public getPostById(postId: number): Observable<Post> {
        return this.webApiClient.get<Post>(`posts/${postId}`);
    }

    public update(post: Post): Observable<Post> {
        return this.webApiClient.patch(`posts/${post.id}`, post);
    }

    public removePost(postId: number) {
        return this.webApiClient.delete(`posts/${postId}`);
    }

    public getLikes(postId: number): Observable<User[]> {
        return this.webApiClient.get<User[]>(`posts/${postId}/likes`);
    }

    public likePost(postId: number) {
        return this.webApiClient.post(`posts/${postId}/likes`, null);
    }

    public removePostLike(postId: number) {
        return this.webApiClient.delete(`posts/${postId}/likes`);
    }
}
