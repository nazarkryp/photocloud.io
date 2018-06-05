import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { MediaService } from 'app/services';
import { UpdateMediaViewModel, MediaViewModel, UpdateAttachmentViewModel } from 'app/models/view';
import { ConfirmComponent } from 'app/components/shared/confirm/confirm.component';

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

        return updateMediaModel;
    }

    public changeCover(target: UpdateMediaViewModel, attachment: UpdateAttachmentViewModel) {
        if (!attachment.removed) {
            target.coverId = attachment.id;
        }
    }

    public removeAttachment(updateMediaModel: UpdateMediaViewModel, attachmentToRemove: UpdateAttachmentViewModel) {
        this.remove(attachmentToRemove);
    }

    public restoreAttachment(updateMediaModel: UpdateMediaViewModel, attachmentToRestore: UpdateAttachmentViewModel) {
        attachmentToRestore.removed = false;
    }

    public updateMedia(media: MediaViewModel, updateMediaModel: UpdateMediaViewModel): Observable<MediaViewModel> {
        const backup = this.createBackup(media);

        media.caption = updateMediaModel.caption;
        media.coverId = updateMediaModel.coverId;
        media.allowComments = updateMediaModel.allowComments;
        media.attachments = updateMediaModel.attachments;

        return this.mediaService.update(updateMediaModel)
            .pipe(tap((updatedMedia) => {
                // media.caption = updatedMedia.caption;
                // media.coverId = updatedMedia.coverId;
                // media.attachments = updatedMedia.attachments;
            }, catchError(error => {
                this.restoreFromBackup(backup, media);
                return error;
            })));
    }

    public cancel(media: MediaViewModel, updateMediaModel: UpdateMediaViewModel): any {
        let pendingChanges: boolean;
        if (media.caption !== updateMediaModel.caption
            || media.coverId !== updateMediaModel.coverId
            || media.allowComments !== updateMediaModel.allowComments
            || media.attachments.length !== updateMediaModel.attachments.length) {
            pendingChanges = true;

            const dialogRef = this.dialog.open(ConfirmComponent, {
                data: {
                    title: 'Unsaved Changed',
                    message: 'There are unsaved changes. Are you sure you want to continue?',
                    cancelButton: 'No',
                    confirmButton: 'Yes'
                }
            });

            dialogRef.afterClosed()
                .subscribe(remove => {
                    if (remove) {
                        media.editing = false;
                        updateMediaModel = null;
                    }
                });
        } else {
            media.editing = false;
            updateMediaModel = null;
        }
    }

    private remove(attachmentToRemove: UpdateAttachmentViewModel) {
        attachmentToRemove.removed = true;
    }

    private createBackup(media: MediaViewModel) {
        const backup = new MediaViewModel();

        backup.caption = media.caption;
        backup.coverId = media.coverId;
        backup.allowComments = media.allowComments;
        backup.attachments = media.attachments.slice();

        return backup;
    }

    private restoreFromBackup(backup: MediaViewModel, media: MediaViewModel) {
        media.caption = backup.caption;
        media.coverId = backup.coverId;
        media.allowComments = backup.allowComments;
        media.attachments = backup.attachments.slice();
    }
}
