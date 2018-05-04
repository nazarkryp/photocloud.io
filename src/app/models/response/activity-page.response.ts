import { ActivityResponse } from './activity.response';
import { PageResponse } from './page-response.model';

export class ActivityPageResponse extends PageResponse<ActivityResponse> {
    public unread: number;
}
