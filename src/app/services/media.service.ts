import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { WebApiClient } from '../infrastructure/communication';
import { UserMapper } from '../infrastructure/mapping';
import { PageViewModel, PaginationViewModel, MediaViewModel, UserViewModel, CreateMediaModel } from 'app/models/view';
import { PageResponse, MediaResponse } from 'app/models/response';
import { MediaMapper } from 'app/infrastructure/mapping';
import { PageMapper } from 'app/infrastructure/mapping';
import { PaginationMapper } from 'app/infrastructure/mapping';

@Injectable()
export class MediaService {
    private pageMapper: PageMapper<MediaResponse, MediaViewModel>;

    constructor(
        private paginationMapper: PaginationMapper,
        private mediaMapper: MediaMapper,
        private webApiClient: WebApiClient,
        private userMapper: UserMapper) {
        this.pageMapper = new PageMapper(this.mediaMapper);
    }

    public createPost(post: CreateMediaModel) {
        return this.webApiClient.post<MediaViewModel>('media', post);
    }

    public getPosts(pagination: PaginationViewModel): Observable<PageViewModel<MediaViewModel>> {
        let requestUri = 'media/recent';

        if (pagination && pagination.next != null) {
            requestUri = requestUri + '?next=' + pagination.next;
        }

        return this.webApiClient.get<PageResponse<MediaResponse>>(requestUri)
            .map(page => {
                const pageViewModel = this.pageMapper.mapFromResponse(page);
                return pageViewModel;
            });
    }

    public getUserPosts(username: string, pagination: PaginationViewModel): Observable<PageViewModel<MediaViewModel>> {
        let requestUri = 'media/' + username;

        if (pagination != null && pagination.next != null) {
            requestUri = requestUri + '?next=' + pagination.next;
        }

        return this.webApiClient.get<PageViewModel<MediaViewModel>>(requestUri);
    }

    public getPostsByTag(tag: string, pagination: PaginationViewModel) {
        let requestUri = `media/tags/${tag}`;

        if (pagination != null && pagination.next != null) {
            requestUri = requestUri + '?next=' + pagination.next;
        }

        return this.webApiClient.get<PageViewModel<MediaViewModel>>(requestUri);
    }

    public getPostById(postId: number): Observable<MediaViewModel> {
        return this.webApiClient.get<MediaViewModel>(`media/${postId}`);
    }

    public update(post: MediaViewModel): Observable<MediaViewModel> {
        return this.webApiClient.patch(`media/${post.id}`, post);
    }

    public removePost(postId: number) {
        return this.webApiClient.delete(`media/${postId}`);
    }

    public getLikes(postId: number): Observable<UserViewModel[]> {
        return this.webApiClient.get<UserViewModel[]>(`media/${postId}/likes`);
    }

    public likePost(postId: number) {
        return this.webApiClient.post(`media/${postId}/likes`, null);
    }

    public removePostLike(postId: number) {
        return this.webApiClient.delete(`media/${postId}/likes`);
    }
}
