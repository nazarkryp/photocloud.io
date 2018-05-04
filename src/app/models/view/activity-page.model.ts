import { ActivityViewModel } from './activity.model';
import { Page } from './page.model';

export class ActivityPage extends Page<ActivityViewModel> {
    public unread: number;
}
