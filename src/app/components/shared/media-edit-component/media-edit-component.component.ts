import { Component, OnInit, Input } from '@angular/core';

import { MediaViewModel, UpdateAttachmentViewModel, UpdateMediaViewModel } from 'app/models/view';
import { EditMediaService } from 'app/shared/services';

@Component({
    selector: 'app-media-edit-component',
    templateUrl: './media-edit-component.component.html',
    styleUrls: ['./media-edit-component.component.css']
})
export class MediaEditComponentComponent implements OnInit {
    @Input() public media: MediaViewModel;
    public updateMediaModel: UpdateMediaViewModel;

    constructor(
        private editMediaService: EditMediaService) {
    }

    public select(attachment: UpdateAttachmentViewModel) {
        this.editMediaService.changeCover(this.updateMediaModel, attachment);

        if (!attachment.removed) {
            this.media.activeAttachment = this.media.attachments.findIndex(e => e.id === attachment.id);
        }
    }

    public remove(attachmentToRemove: UpdateAttachmentViewModel) {
        this.editMediaService.removeAttachment(this.updateMediaModel, attachmentToRemove);
    }

    public restoreRemovedAttachment(attachmentToRestore: UpdateAttachmentViewModel) {
        this.editMediaService.restoreAttachment(this.updateMediaModel, attachmentToRestore);
    }

    public save() {
        this.editMediaService.updateMedia(this.media, this.updateMediaModel).subscribe(() => {

        });

        this.media.editing = false;
    }

    public cancel() {
        this.media.editing = false;
    }

    public ngOnInit() {
        this.updateMediaModel = this.editMediaService.createUpdateModel(this.media);
    }
}
