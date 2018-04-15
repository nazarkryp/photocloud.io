import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { WebApiService } from 'app/core/services/communication';
import { ActivityViewModel, Page, PaginationViewModel } from 'app/models/view';
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

    public getRecentActivity(pagination: PaginationViewModel = null): Observable<Page<ActivityViewModel>> {
        let requestUri = 'activities/recent';

        if (pagination && pagination.next) {
            requestUri = `${requestUri}?next=${pagination.next}`;
        }

        return this.httpClient.get<Page<ActivityResponse>>(requestUri)
            .map(page => {
                return this.pageMapper.mapFromResponse(page);
            });
    }
}
