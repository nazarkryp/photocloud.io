import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { WebApiClient } from 'app/infrastructure/communication';
import { CommentViewModel, PageViewModel, PaginationViewModel, } from 'app/models/view';
import { PageMapper, CommentMapper } from 'app/infrastructure/mapping';
import { CommentResponse } from 'app/models/response';

@Injectable()
export class CommentService {
    private pageMapper: PageMapper<CommentResponse, CommentViewModel>;

    constructor(
        private webApiClient: WebApiClient,
        private commentMapper: CommentMapper) {
        this.pageMapper = new PageMapper(commentMapper);
    }

    public getComments(mediaId: number, pagination: PaginationViewModel): Observable<PageViewModel<CommentViewModel>> {
        let requesUri = `media/${mediaId}/comments`;

        if (pagination && pagination.next != null) {
            requesUri = `${requesUri}?next=${pagination.next}`;
        }

        return this.webApiClient.get<PageViewModel<CommentResponse>>(requesUri)
            .map(page => {
                return this.pageMapper.mapFromResponse(page);
            });
    }

    public createComment(mediaId: number, comment: any): Observable<CommentViewModel> {
        return this.webApiClient.post(`media/${mediaId}/comments`, comment);
    }

    public editComment(mediaId: number, commentId: number, comment) {
        return this.webApiClient.put(`media/${mediaId}/comments/${commentId}`, comment);
    }

    public removeComment(mediaId: number, commentId: number) {
        return this.webApiClient.delete(`media/${mediaId}/comments/${commentId}`);
    }
}
