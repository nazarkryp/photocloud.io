import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { WebApiClient } from 'app/infrastructure/communication';
import { Page, PaginationViewModel, MediaViewModel, UserViewModel, CreateMediaModel, UpdateMediaViewModel } from 'app/models/view';
import { PageResponse, MediaResponse } from 'app/models/response';
import { MediaMapper, PageMapper, PaginationMapper, UserMapper } from 'app/infrastructure/mapping';

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

    public createMedia(createMediaModel: CreateMediaModel) {
        const request = this.mediaMapper.mapCreateToRequest(createMediaModel);

        return this.webApiClient.post<MediaResponse>('media', request)
            .map(response => {
                return this.mediaMapper.mapFromResponse(response);
            });
    }

    public getRecentMedia(pagination: PaginationViewModel): Observable<Page<MediaViewModel>> {
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

    public getUserMedia(username: string, pagination: PaginationViewModel): Observable<Page<MediaViewModel>> {
        let requestUri = 'media/' + username;

        if (pagination != null && pagination.next != null) {
            requestUri = requestUri + '?next=' + pagination.next;
        }

        return this.webApiClient.get<PageResponse<MediaResponse>>(requestUri)
            .map(page => {
                return this.pageMapper.mapFromResponse(page);
            });
    }

    public getMediaByTag(tag: string, pagination: PaginationViewModel) {
        let requestUri = `media/tags/${tag}`;

        if (pagination != null && pagination.next != null) {
            requestUri = requestUri + '?next=' + pagination.next;
        }

        return this.webApiClient.get<PageResponse<MediaResponse>>(requestUri)
            .map(page => {
                const pageViewModel = this.pageMapper.mapFromResponse(page);
                return pageViewModel;
            });
    }

    public getLikedMedia(pagination: PaginationViewModel) {
        let requestUri = 'media/liked';

        if (pagination != null && pagination.next != null) {
            requestUri = `${requestUri}?next=${pagination.next}`;
        }

        return this.webApiClient.get<PageResponse<MediaResponse>>(requestUri)
            .map(page => {
                const pageViewModel = this.pageMapper.mapFromResponse(page);
                return pageViewModel;
            });
    }

    public getMediaById(mediaId: number): Observable<MediaViewModel> {
        return this.webApiClient.get<MediaViewModel>(`media/${mediaId}`);
    }

    public update(media: UpdateMediaViewModel): Observable<MediaViewModel> {
        const request = this.mediaMapper.mapUpdateToRequest(media);
        return this.webApiClient.patch<MediaResponse>(`media/${media.id}`, request)
            .map(updatedMedia => {
                return this.mediaMapper.mapFromResponse(updatedMedia);
            });
    }

    public removeMedia(mediaId: number) {
        return this.webApiClient.delete(`media/${mediaId}`);
    }

    public getLikes(mediaId: number): Observable<UserViewModel[]> {
        return this.webApiClient.get<UserViewModel[]>(`media/${mediaId}/likes`);
    }

    public addMediaLike(mediaId: number) {
        return this.webApiClient.post(`media/${mediaId}/likes`, null);
    }

    public removeMediaLike(mediaId: number) {
        return this.webApiClient.delete(`media/${mediaId}/likes`);
    }
}
