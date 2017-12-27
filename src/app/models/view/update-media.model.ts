import { AttachmentViewModel } from 'app/models/view/attachment.model';

export class UpdateMediaModel {
    public id: number;
    public caption: string;
    public attachmentsToRemove: number[];
    public attachments: AttachmentViewModel[];
}
