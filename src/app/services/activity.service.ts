import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { WebApiService } from 'app/core/services/communication';
import { ActivityViewModel, Page } from 'app/models/view';
import { ActivityResponse } from 'app/models/response';
import { PageMapper } from 'app/infrastructure/mapping';
import { ActivityMapper } from 'app/infrastructure/mapping';

@Injectable()
export class ActivityService {
    private pageMapper: PageMapper<ActivityResponse, ActivityViewModel>;

    constructor(
        private httpClient: WebApiService,
        private activityMapper: ActivityMapper) {
        this.pageMapper = new PageMapper(this.activityMapper);
    }

    public getRecentActivity(): Observable<Page<ActivityViewModel>> {
        return this.httpClient.get<Page<ActivityResponse>>('activities/recent')
            .map(page => {
                return this.pageMapper.mapFromResponse(page);
            });
    }
}
