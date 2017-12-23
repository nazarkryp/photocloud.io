import { Injectable } from '@angular/core';

import { AttachmentViewModel } from 'app/models/view';
import { AttachmentResponse } from 'app/models/response';

@Injectable()
export class AttachmentMapper {
    public mapFromResponse(response: AttachmentResponse): AttachmentViewModel {
        const attachment = new AttachmentViewModel();

        attachment.id = response.id;
        attachment.uri = response.uri;
        attachment.type = response.type;

        return attachment;
    }

    public mapFromResponseArray(responseArray: AttachmentResponse[]): AttachmentViewModel[] {
        return responseArray.map(e => this.mapFromResponse(e));
    }
}
