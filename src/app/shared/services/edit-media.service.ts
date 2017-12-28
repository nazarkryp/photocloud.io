import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import 'rxjs/add/operator/mergeMap';

import { ConfirmComponent } from 'app/components/shared/confirm/confirm.component';

import { MediaService } from 'app/services';
import { UpdateMediaModel, MediaViewModel, UpdateAttachmentViewModel } from 'app/models/view';

@Injectable()
export class EditMediaService {
    constructor(
        private dialog: MatDialog,
        private mediaService: MediaService) { }

    public createUpdateModel(media: MediaViewModel): UpdateMediaModel {
        const updateMediaModel = new UpdateMediaModel();

        updateMediaModel.id = media.id;
        updateMediaModel.caption = media.caption;
        updateMediaModel.allowComments = media.allowComments;

        updateMediaModel.attachments = media.attachments.map(attachment => {
            const updateAttachment = new UpdateAttachmentViewModel();

            updateAttachment.id = attachment.id;
            updateAttachment.type = attachment.type;
            updateAttachment.uri = attachment.uri;

            return updateAttachment;
        });

        return updateMediaModel;
    }

    public removeAttachment(updateMediaModel: UpdateMediaModel, attachmentToRemove: UpdateAttachmentViewModel) {
        if (updateMediaModel.attachments.length === 1) {
            const dialogRef = this.dialog.open(ConfirmComponent, {
                data: {
                    title: 'DELETE POST',
                    message: 'Post without attachments will be removed. Are you sure you want you want to delete this post?'
                }
            });

            dialogRef.afterClosed()
                .subscribe(remove => {
                    if (remove) {
                        this.remove(updateMediaModel, attachmentToRemove);
                    }
                });
        } else {
            this.remove(updateMediaModel, attachmentToRemove);
        }
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

    private remove(updateMediaModel: UpdateMediaModel, attachmentToRemove: UpdateAttachmentViewModel) {
        // const indexToRemove = updateMediaModel.attachments.findIndex(e => e.id === attachmentToRemove.id);
        // updateMediaModel.attachments.splice(indexToRemove, 1);

        attachmentToRemove.removed = true;

        if (!updateMediaModel.attachmentsToRemove) {
            updateMediaModel.attachmentsToRemove = new Array<number>();
        }

        updateMediaModel.attachmentsToRemove.push(attachmentToRemove.id);
    }
}
