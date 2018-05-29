import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { WebApiService } from 'app/core/services/communication';
import { CommentViewModel, Page, PaginationViewModel, MediaViewModel, CurrentUserViewModel, UserViewModel, } from 'app/models/view';
import { PageMapper, CommentMapper, UserMapper } from 'app/infrastructure/mapping';
import { CommentResponse } from 'app/models/response';
import { CurrentUserService } from 'app/infrastructure/services/current-user.service';

@Injectable()
export class CommentService {
    private pageMapper: PageMapper<CommentResponse, CommentViewModel>;
    private currentUser: UserViewModel;

    constructor(
        private apiService: WebApiService,
        private commentMapper: CommentMapper,
        private currentUserService: CurrentUserService,
        private userMapper: UserMapper) {
        const currentUser = this.currentUserService.retrieveCurrentUser();
        this.currentUser = this.userMapper.mapFromCurrentUser(currentUser);
        this.pageMapper = new PageMapper(commentMapper);
    }

    public getComments(mediaId: number, pagination: PaginationViewModel): Observable<Page<CommentViewModel>> {
        let requesUri = `media/${mediaId}/comments`;

        if (pagination && pagination.next != null) {
            requesUri = `${requesUri}?next=${pagination.next}`;
        }

        return this.apiService.get<Page<CommentResponse>>(requesUri)
            .pipe(map(page => {
                return this.pageMapper.mapFromResponse(page);
            }));
    }

    public addComment(media: MediaViewModel, commentBody: string): {
        comment: CommentViewModel;
        commentObservable: Observable<{} | CommentViewModel>;
    } {
        if (!media.comments) {
            media.comments = new Array<CommentViewModel>();
        }

        const comment = new CommentViewModel();
        comment.text = commentBody;
        comment.date = new Date();
        comment.user = new UserViewModel();
        comment.user.id = this.currentUser.id;
        comment.user.username = this.currentUser.username;

        media.commentsCount++;

        const commentObservable = this.createComment(media.id, { text: commentBody })
            .pipe(tap(createdComment => {
                comment.id = createdComment.id;
                comment.date = createdComment.date;
            }), catchError(error => {
                media.commentsCount--;
                return error;
            }));

        const result = { comment, commentObservable };

        return result;
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
