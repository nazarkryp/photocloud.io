import { AttachmentViewModel } from './attachment.model';

export class CreateMediaModel {
    public caption: string;
    public attachmentIds: number[];
    public allowComments?: boolean;
}
