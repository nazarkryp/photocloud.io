import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { WebApiClient } from 'app/infrastructure/communication';
import { CommentViewModel, } from 'app/models/view';

@Injectable()
export class CommentService {
    constructor(
        private webApiClient: WebApiClient) { }

    public getComments(mediaId: number): Observable<CommentViewModel[]> {
        return this.webApiClient.get(`media/${mediaId}/comments`);
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
