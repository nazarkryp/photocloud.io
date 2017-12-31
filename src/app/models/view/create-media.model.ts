import { AttachmentViewModel } from './attachment.model';

export class CreateMediaModel {
    public caption: string;
    public coverId: number;
    public attachments: AttachmentViewModel[];
    public allowComments: boolean;
    public currentAttachmentIndex: number;
}
