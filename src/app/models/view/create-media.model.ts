import { AttachmentViewModel } from './attachment.model';

export class CreateMediaModel {
    public caption: string;
    public coverId: number;
    public attachments: AttachmentViewModel[];
    public allowComments: boolean;
    public selectedAttachmentIndex: number;

    constructor() {
        this.attachments = new Array<AttachmentViewModel>();
        this.selectedAttachmentIndex = 0;
    }

    public get coverAttachmentIndex() {
        const coverIndex = this.attachments.findIndex(e => e.id === this.coverId);

        return coverIndex;
    }
}
