import { Attachment } from './attachment';

export class CreatePostModel {
    caption: string;
    AttachmentIds: number[];
    AllowComments?: boolean;
}
