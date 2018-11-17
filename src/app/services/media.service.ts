import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { WebApiService } from 'app/core/services/communication';
import { Page, PaginationViewModel, MediaViewModel, UserViewModel, CreateMediaModel, UpdateMediaViewModel } from 'app/models/view';
import { PageResponse, MediaResponse } from 'app/models/response';
import { MediaMapper, PageMapper, PaginationMapper, UserMapper } from 'app/infrastructure/mapping';

@Injectable()
export class MediaService {
    private pageMapper: PageMapper<MediaResponse, MediaViewModel>;

    constructor(
        private paginationMapper: PaginationMapper,
        private mediaMapper: MediaMapper,
        private apiService: WebApiService,
        private userMapper: UserMapper) {
        this.pageMapper = new PageMapper(this.mediaMapper);
    }

    public createMedia(createMediaModel: CreateMediaModel) {
        const request = this.mediaMapper.mapCreateToRequest(createMediaModel);

        return this.apiService.post<MediaResponse>('media', request)
            .pipe(map(response => {
                return this.mediaMapper.mapFromResponse(response);
            }));
    }

    public getRecentMedia(pagination: PaginationViewModel): Observable<Page<MediaViewModel>> {
        let requestUri = 'media/recent';

        if (pagination && pagination.next != null) {
            requestUri = requestUri + '?next=' + pagination.next;
        }

        return this.apiService.get<PageResponse<MediaResponse>>(requestUri)
            .pipe(map(this.pageMapper.mapFromResponse));
    }

    public getUserMedia(username: string, pagination: PaginationViewModel, mediaType?: number): Observable<Page<MediaViewModel>> {
        let requestUri = 'media/' + username;

        if (pagination != null && pagination.next != null) {
            requestUri = requestUri + '?next=' + pagination.next;
        }

        if (mediaType) {
            if (pagination != null && pagination.next != null) {
                requestUri = `${requestUri}&mediaType=${mediaType}`;
            } else {
                requestUri = `${requestUri}?mediaType=${mediaType}`;
            }
        }

        return this.apiService.get<PageResponse<MediaResponse>>(requestUri)
            .pipe(map(this.pageMapper.mapFromResponse));
    }

    public getMediaByTag(tag: string, pagination: PaginationViewModel) {
        let requestUri = `media/tags/${tag}`;

        if (pagination != null && pagination.next != null) {
            requestUri = requestUri + '?next=' + pagination.next;
        }

        return this.apiService.get<PageResponse<MediaResponse>>(requestUri)
            .pipe(map(page => {
                const pageViewModel = this.pageMapper.mapFromResponse(page);
                return pageViewModel;
            }));
    }

    public getLikedMedia(pagination: PaginationViewModel) {
        let requestUri = 'media/liked';

        if (pagination != null && pagination.next != null) {
            requestUri = `${requestUri}?next=${pagination.next}`;
        }

        return this.apiService.get<PageResponse<MediaResponse>>(requestUri)
            .pipe(map(page => {
                const pageViewModel = this.pageMapper.mapFromResponse(page);
                return pageViewModel;
            }));
    }

    public getMediaById(mediaId: number): Observable<MediaViewModel> {
        return this.apiService.get<MediaViewModel>(`media/${mediaId}`);
    }

    public update(media: UpdateMediaViewModel): Observable<MediaViewModel> {
        const request = this.mediaMapper.mapUpdateToRequest(media);
        return this.apiService.patch<MediaResponse>(`media/${media.id}`, request)
            .pipe(map(updatedMedia => {
                return this.mediaMapper.mapFromResponse(updatedMedia);
            }));
    }

    public removeMedia(mediaId: number) {
        return this.apiService.delete(`media/${mediaId}`);
    }

    public getLikes(mediaId: number): Observable<UserViewModel[]> {
        return this.apiService.get<UserViewModel[]>(`media/${mediaId}/likes`);
    }

    public addMediaLike(mediaId: number) {
        return this.apiService.post(`media/${mediaId}/likes`, null);
    }

    public removeMediaLike(mediaId: number) {
        return this.apiService.delete(`media/${mediaId}/likes`);
    }
}
