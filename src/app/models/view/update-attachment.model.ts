import { AttachmentViewModel } from './attachment.model';

export class UpdateAttachmentViewModel extends AttachmentViewModel {
    public removed: boolean;
    public isSelected: boolean;

    constructor() {
        super();
        this.removed = false;
    }
}
