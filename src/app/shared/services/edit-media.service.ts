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
        this.remove(attachmentToRemove);

        // if (updateMediaModel.attachments) {
        //     const dialogRef = this.dialog.open(ConfirmComponent, {
        //         data: {
        //             title: 'DELETE POST',
        //             message: 'Post without attachments will be removed. Are you sure you want you want to delete this post?'
        //         }
        //     });

        //     dialogRef.afterClosed()
        //         .subscribe(remove => {
        //             if (remove) {
        //                 this.remove(updateMediaModel, attachmentToRemove);
        //             }
        //         });
        // } else {

        // }
    }

    public restoreAttachment(updateMediaModel: UpdateMediaModel, attachmentToRestore: UpdateAttachmentViewModel) {
        attachmentToRestore.removed = false;
    }

    public updateMedia(media: MediaViewModel, updateMediaModel: UpdateMediaModel) {
        if (updateMediaModel.remove) {
            const dialogRef = this.dialog.open(ConfirmComponent, {
                data: {
                    title: 'DELETE POST',
                    message: 'Post without attachments will be removed. Are you sure you want you want to delete this post?'
                }
            });

            dialogRef.afterClosed()
                .subscribe(remove => {
                    if (remove) {
                        this.update(media, updateMediaModel);
                    }
                });
        } else {
            this.update(media, updateMediaModel);
        }
    }

    private update(media: MediaViewModel, updateMediaModel: UpdateMediaModel) {
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

    private remove(attachmentToRemove: UpdateAttachmentViewModel) {
        attachmentToRemove.removed = true;
    }
}
