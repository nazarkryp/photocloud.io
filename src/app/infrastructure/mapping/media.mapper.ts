import { Injectable } from '@angular/core';

import { MediaResponse } from 'app/models/response';
import { MediaViewModel } from 'app/models/view';
import { UserMapper } from 'app/infrastructure/mapping/user.mapper';
import { CommentMapper } from 'app/infrastructure/mapping/comment.mapper';
import { AttachmentMapper } from 'app/infrastructure/mapping/attachment.mapper';
import { IMapper } from 'app/infrastructure/mapping/mapper';

@Injectable()
export class MediaMapper implements IMapper<MediaResponse, MediaViewModel> {
    constructor(
        private attachmentMapper: AttachmentMapper,
        private userMapper: UserMapper,
        private commentMapper: CommentMapper) { }

    public mapFromResponse(response: MediaResponse): MediaViewModel {
        const media = new MediaViewModel();

        media.id = response.id;
        media.allowComments = response.allowComments;
        media.attachments = this.attachmentMapper.mapFromResponseArray(response.attachments);
        media.caption = response.caption;
        media.created = new Date(response.created);
        media.comments = this.commentMapper.mapFromResponseArray(response.comments);
        media.commentsCount = response.commentsCount;
        media.likes = this.userMapper.mapFromResponseArray(response.likes);
        media.likesCount = response.likesCount;
        media.user = this.userMapper.mapFromResponse(response.user);
        media.userHasLiked = response.userHasLiked;

        return media;
    }

    public mapFromResponseArray(responseArray: MediaResponse[]): MediaViewModel[] {
        return responseArray.map(response => this.mapFromResponse(response));
    }
}
