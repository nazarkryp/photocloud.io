import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { WebApiService } from 'app/core/services/communication';
import { CommentViewModel, Page, PaginationViewModel, } from 'app/models/view';
import { PageMapper, CommentMapper } from 'app/infrastructure/mapping';
import { CommentResponse } from 'app/models/response';

@Injectable()
export class CommentService {
    private pageMapper: PageMapper<CommentResponse, CommentViewModel>;

    constructor(
        private apiService: WebApiService,
        private commentMapper: CommentMapper) {
        this.pageMapper = new PageMapper(commentMapper);
    }

    public getComments(mediaId: number, pagination: PaginationViewModel): Observable<Page<CommentViewModel>> {
        let requesUri = `media/${mediaId}/comments`;

        if (pagination && pagination.next != null) {
            requesUri = `${requesUri}?next=${pagination.next}`;
        }

        return this.apiService.get<Page<CommentResponse>>(requesUri)
            .map(page => {
                return this.pageMapper.mapFromResponse(page);
            });
    }

    public createComment(mediaId: number, comment: any): Observable<CommentViewModel> {
        return this.apiService.post(`media/${mediaId}/comments`, comment);
    }

    public editComment(mediaId: number, commentId: number, comment) {
        return this.apiService.put(`media/${mediaId}/comments/${commentId}`, comment);
    }

    public removeComment(mediaId: number, commentId: number) {
        return this.apiService.delete(`media/${mediaId}/comments/${commentId}`);
    }
}
