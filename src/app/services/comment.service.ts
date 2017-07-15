import { Injectable } from '@angular/core';

import { WebApiClient } from '../infrastructure/communication/http';

import { Comment } from '../common/models/comment';

@Injectable()
export class CommentService {
    constructor(private WebApiClient: WebApiClient) { }

    getComments(postId: number): Promise<Comment[]> {
        return this.WebApiClient.get(`${postId}/comments`)
            .then(response => response.json() as Comment[])
            .catch(this.handleError);
    }

    createComment(postId: number, comment: any): Promise<Comment> {
        return this.WebApiClient.post(`${postId}/comments`, comment)
            .then(response => response.json() as Comment)
            .catch(this.handleError);
    }

    editComment(postId: number, commentId: number, comment) {
        return this.WebApiClient.put(`${postId}/comments/${commentId}`, comment)
            .then(response => response.json() as Comment)
            .catch(this.handleError);
    }

    removeComment(postId: number, commentId: number) {
        return this.WebApiClient.delete(`${postId}/comments/${commentId}`)
            .then(response => { })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}
