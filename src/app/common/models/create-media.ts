import { Attachment } from './attachment';

export class CreateMediaModel {
    caption: string;
    AttachmentIds: number[];
    AllowComments?: boolean;
}
