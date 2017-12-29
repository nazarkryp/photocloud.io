import { UpdateAttachmentViewModel } from 'app/models/view/update-attachment.model';

export class UpdateMediaModel {
    public id: number;
    public caption: string;
    public allowComments: boolean;
    public attachments: UpdateAttachmentViewModel[];

    public get remove(): boolean {
        return this.attachments.filter(a => a.removed).length === this.attachments.length;
    }
}
