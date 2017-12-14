import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { WebApiClient } from '../infrastructure/communication';
import { UserMapper } from '../infrastructure/mapping';
import { Page, Pagination, Media, User, CreateMediaModel } from '../common/models';

@Injectable()
export class MediaService {
    constructor(
        private webApiClient: WebApiClient,
        private userMapper: UserMapper) { }

    public createPost(post: CreateMediaModel) {
        return this.webApiClient.post<Media>('media', post);
    }

    public getPosts(pagination: Pagination): Observable<Page<Media>> {
        let requestUri = 'media/recent';

        if (pagination && pagination.next != null) {
            requestUri = requestUri + '?next=' + pagination.next;
        }

        return this.webApiClient.get<Page<Media>>(requestUri);
    }

    public getUserPosts(username: string, pagination: Pagination): Observable<Page<Media>> {
        let requestUri = 'media/' + username;

        if (pagination != null && pagination.next != null) {
            requestUri = requestUri + '?next=' + pagination.next;
        }

        return this.webApiClient.get<Page<Media>>(requestUri);
    }

    public getPostsByTag(tag: string, pagination: Pagination) {
        let requestUri = `media/tags/${tag}`;

        if (pagination != null && pagination.next != null) {
            requestUri = requestUri + '?next=' + pagination.next;
        }

        return this.webApiClient.get<Page<Media>>(requestUri);
    }

    public getPostById(postId: number): Observable<Media> {
        return this.webApiClient.get<Media>(`media/${postId}`);
    }

    public update(post: Media): Observable<Media> {
        return this.webApiClient.patch(`media/${post.id}`, post);
    }

    public removePost(postId: number) {
        return this.webApiClient.delete(`media/${postId}`);
    }

    public getLikes(postId: number): Observable<User[]> {
        return this.webApiClient.get<User[]>(`media/${postId}/likes`);
    }

    public likePost(postId: number) {
        return this.webApiClient.post(`media/${postId}/likes`, null);
    }

    public removePostLike(postId: number) {
        return this.webApiClient.delete(`media/${postId}/likes`);
    }
}
