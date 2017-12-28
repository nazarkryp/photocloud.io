import { Injectable } from '@angular/core';

import { MediaService } from 'app/services';
import { UpdateMediaModel, MediaViewModel, AttachmentViewModel } from 'app/models/view';

@Injectable()
export class EditMediaService {
    constructor(
        private mediaService: MediaService) { }

    public createUpdateModel(media: MediaViewModel): UpdateMediaModel {
        const updateMediaModel = new UpdateMediaModel();

        updateMediaModel.id = media.id;
        updateMediaModel.caption = media.caption;
        updateMediaModel.attachments = media.attachments.map(attachment => {
            const attachmentCopy = new AttachmentViewModel();

            attachmentCopy.id = attachment.id;
            attachmentCopy.type = attachment.type;
            attachmentCopy.uri = attachment.uri;

            return attachment;
        });

        return updateMediaModel;
    }

    public removeAttachment(updateMediaModel: UpdateMediaModel, attachmentToRemove: AttachmentViewModel) {
        const indexToRemove = updateMediaModel.attachments.findIndex(e => e.id === attachmentToRemove.id);
        updateMediaModel.attachments.splice(indexToRemove, 1);

        if (!updateMediaModel.attachmentsToRemove) {
            updateMediaModel.attachmentsToRemove = new Array<number>();
        }

        updateMediaModel.attachmentsToRemove.push(attachmentToRemove.id);
    }

    public update(media: MediaViewModel, updateMediaModel: UpdateMediaModel) {
        const captionBakup = media.caption;
        const attachmentsBackup = media.attachments;

        media.editing = false;

        media.caption = updateMediaModel.caption;
        this.mediaService.update(updateMediaModel)
            .subscribe((updatedMedia) => {
                media.caption = updatedMedia.caption;
            }, (error) => {
                media.caption = captionBakup;
            });
    }
}
