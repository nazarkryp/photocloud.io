import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import 'rxjs/add/operator/mergeMap';

import { ConfirmComponent } from 'app/components/shared/confirm/confirm.component';

import { MediaService } from 'app/services';
import { UpdateMediaViewModel, MediaViewModel, UpdateAttachmentViewModel } from 'app/models/view';

@Injectable()
export class EditMediaService {
    constructor(
        private dialog: MatDialog,
        private mediaService: MediaService) { }

    public createUpdateModel(media: MediaViewModel): UpdateMediaViewModel {
        const updateMediaModel = new UpdateMediaViewModel();

        updateMediaModel.id = media.id;
        updateMediaModel.caption = media.caption;
        updateMediaModel.allowComments = media.allowComments;
        updateMediaModel.coverId = media.coverId;

        updateMediaModel.attachments = media.attachments.map(attachment => {
            const updateAttachment = new UpdateAttachmentViewModel();

            updateAttachment.id = attachment.id;
            updateAttachment.type = attachment.type;
            updateAttachment.uri = attachment.uri;

            return updateAttachment;
        });

        updateMediaModel.attachments.find(a => a.id === updateMediaModel.coverId).isSelected = true;

        return updateMediaModel;
    }

    public setAsCover() {
    }

    public select(updateMediaModel: UpdateMediaViewModel, attachmentToSelect: UpdateAttachmentViewModel) {
        updateMediaModel.attachments.forEach(attachment => attachment.isSelected = false);
        attachmentToSelect.isSelected = true;
    }

    public removeAttachment(updateMediaModel: UpdateMediaViewModel, attachmentToRemove: UpdateAttachmentViewModel) {
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

    public restoreAttachment(updateMediaModel: UpdateMediaViewModel, attachmentToRestore: UpdateAttachmentViewModel) {
        attachmentToRestore.removed = false;
    }

    public updateMedia(media: MediaViewModel, updateMediaModel: UpdateMediaViewModel) {
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

    private update(media: MediaViewModel, updateMediaModel: UpdateMediaViewModel) {
        const captionBakup = media.caption;
        const attachmentsBackup = media.attachments;

        media.editing = false;
        media.caption = updateMediaModel.caption;
        this.mediaService.update(updateMediaModel)
            .subscribe((updatedMedia) => {
                media.caption = updatedMedia.caption;

                if (media.attachments.length !== updatedMedia.attachments.length) {
                    media.attachments = updatedMedia.attachments;
                }
            }, (error) => {
                media.caption = captionBakup;
            });
    }

    private remove(attachmentToRemove: UpdateAttachmentViewModel) {
        attachmentToRemove.removed = true;
    }
}
