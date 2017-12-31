import { Injectable } from '@angular/core';

import { MediaResponse } from 'app/models/response';
import { MediaViewModel, UpdateMediaViewModel, AttachmentViewModel, CreateMediaModel } from 'app/models/view';
import { UserMapper } from 'app/infrastructure/mapping/user.mapper';
import { CommentMapper } from 'app/infrastructure/mapping/comment.mapper';
import { AttachmentMapper } from 'app/infrastructure/mapping/attachment.mapper';
import { IMapper } from 'app/infrastructure/mapping/mapper';
import { UpdateMediaRequest, CreateMediaRequest } from 'app/models/request';

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

        media.coverId = response.coverId;
        media.attachments = this.attachmentMapper.mapFromResponseArray(response.attachments);
        media.attachments = this.moveCoverToFront(media);

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
        if (!responseArray) {
            return null;
        }

        return responseArray.map(response => this.mapFromResponse(response));
    }

    public mapUpdateToRequest(updateMediaModel: UpdateMediaViewModel): UpdateMediaRequest {
        const request = new UpdateMediaRequest();

        request.allowComments = updateMediaModel.allowComments;
        request.caption = updateMediaModel.caption;
        request.attachmentsToRemove = updateMediaModel.attachments.filter(a => a.removed).map(e => e.id);

        return request;
    }

    public mapCreateToRequest(createMediaModel: CreateMediaModel): CreateMediaRequest {
        const request = new CreateMediaRequest();

        request.attachmentIds = createMediaModel.attachments.map(attachment => attachment.id);
        request.coverId = createMediaModel.coverId;
        request.caption = createMediaModel.caption;
        request.allowComments = createMediaModel.allowComments;

        return request;
    }

    private moveCoverToFront(media: MediaViewModel) {
        let newIndex = 0;

        const index = media.attachments.findIndex(e => e.id === media.coverId);
        const attachment = media.attachments.find(e => e.id === media.coverId);

        if (index > -1 && index !== newIndex) {
            if (newIndex >= media.attachments.length) {
                newIndex = media.attachments.length
            }

            const array = media.attachments.slice();

            array.splice(index, 1);
            array.splice(newIndex, 0, attachment);

            return array;
        }

        return media.attachments;
    }
}
