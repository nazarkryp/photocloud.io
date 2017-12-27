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

    public createMedia(createMediaModel: CreateMediaModel) {
        return this.webApiClient.post<MediaViewModel>('media', createMediaModel);
    }

    public getRecentMedia(pagination: PaginationViewModel): Observable<PageViewModel<MediaViewModel>> {
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

    public getUserMedia(username: string, pagination: PaginationViewModel): Observable<PageViewModel<MediaViewModel>> {
        let requestUri = 'media/' + username;

        if (pagination != null && pagination.next != null) {
            requestUri = requestUri + '?next=' + pagination.next;
        }

        return this.webApiClient.get<PageViewModel<MediaViewModel>>(requestUri);
    }

    public getMediaByTag(tag: string, pagination: PaginationViewModel) {
        let requestUri = `media/tags/${tag}`;

        if (pagination != null && pagination.next != null) {
            requestUri = requestUri + '?next=' + pagination.next;
        }

        return this.webApiClient.get<PageViewModel<MediaViewModel>>(requestUri);
    }

    public getMediaById(mediaId: number): Observable<MediaViewModel> {
        return this.webApiClient.get<MediaViewModel>(`media/${mediaId}`);
    }

    public update(media: MediaViewModel): Observable<MediaViewModel> {
        return this.webApiClient.patch(`media/${media.id}`, media);
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
