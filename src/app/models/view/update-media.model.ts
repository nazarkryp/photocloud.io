import { UpdateAttachmentViewModel } from 'app/models/view/update-attachment.model';

export class UpdateMediaModel {
    public id: number;
    public caption: string;
    public allowComments: boolean;
    public attachmentsToRemove: number[];
    public attachments: UpdateAttachmentViewModel[];
}
