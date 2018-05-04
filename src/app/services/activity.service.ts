import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { WebApiService } from 'app/core/services/communication';
import { ActivityViewModel, ActivityPage, PaginationViewModel } from 'app/models/view';
import { ActivityResponse, ActivityPageResponse } from 'app/models/response';
import { ActivityMapper } from 'app/infrastructure/mapping';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { ActivityPageMapper } from '../infrastructure/mapping/activity-page.mapper';

@Injectable()
export class ActivityService {
    private readonly state: ReplaySubject<ActivityPage> = new ReplaySubject<ActivityPage>(1);

    private pageMapper: ActivityPageMapper<ActivityResponse, ActivityViewModel>;
    private page: ActivityPage;

    constructor(
        private httpClient: WebApiService,
        private activityMapper: ActivityMapper) {
        this.pageMapper = new ActivityPageMapper(this.activityMapper);
    }

    public get activityPage(): Observable<ActivityPage> {
        return this.state.asObservable();
    }

    public getRecentActivity(pagination: PaginationViewModel = null): Observable<ActivityPage> {
        let requestUri = 'activities/recent';

        if (pagination && pagination.next) {
            requestUri = `${requestUri}?next=${pagination.next}`;
        }

        return this.httpClient.get<ActivityPageResponse>(requestUri)
            .pipe(map(response => {
                const page = this.pageMapper.mapFromResponse(response);

                if (!this.page || !pagination || !pagination.next) {
                    this.page = page;
                } else {
                    this.page.hasMoreItems = page.hasMoreItems;
                    this.page.pagination = page.pagination;

                    if (page.data && page.data.length) {
                        this.page.data = this.page.data.concat(page.data);
                    }
                }

                this.state.next(this.page);

                return this.page;
            }));
    }

    public removeActivity(activityId: number): Observable<any> {
        return this.httpClient.delete(`activities/${activityId}`);
    }

    public removeAllActivities(): Observable<any> {
        return this.httpClient.delete(`activities`);
    }

    public markAsRead(ids: number[]): Observable<any> {
        return this.httpClient.put<Observable<any>>('activities', {
            ids: ids
        }).do(() => {
            this.page.unread -= ids.length;
            this.page.data.filter(e => ids.find(id => id === e.id)).forEach((element) => {
                element.isMarkedAsRead = true;
            });

            this.state.next(this.page);
        });
    }
}
