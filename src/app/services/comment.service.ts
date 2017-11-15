import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { WebApiClient } from '../infrastructure/communication';
import { Comment } from '../common/models/comment';

@Injectable()
export class CommentService {
    constructor(private webApiClient: WebApiClient) { }

    getComments(postId: number): Observable<Comment[]> {
        return this.webApiClient.get(`posts/${postId}/comments`);
    }

    createComment(postId: number, comment: any): Observable<Comment> {
        return this.webApiClient.post(`posts/${postId}/comments`, comment);
    }

    editComment(postId: number, commentId: number, comment) {
        return this.webApiClient.put(`posts/${postId}/comments/${commentId}`, comment);
    }

    removeComment(postId: number, commentId: number) {
        return this.webApiClient.delete(`posts/${postId}/comments/${commentId}`);
    }
}
