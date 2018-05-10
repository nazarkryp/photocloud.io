import { Injectable } from '@angular/core';

import { Observable, ReplaySubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { WebApiService } from 'app/core/services/communication';
import { ActivityPage, ActivityViewModel, PaginationViewModel } from 'app/models/view';
import { ActivityResponse, ActivityPageResponse } from 'app/models/response';
import { ActivityMapper, ActivityPageMapper } from 'app/infrastructure/mapping';
import { CurrentUserService } from 'app/infrastructure/services/current-user.service';

@Injectable()
export class ActivityService {
    private readonly state: ReplaySubject<ActivityPage> = new ReplaySubject<ActivityPage>(1);

    private pageMapper: ActivityPageMapper<ActivityResponse, ActivityViewModel>;
    private page: ActivityPage;

    constructor(
        private currentUserService: CurrentUserService,
        private httpClient: WebApiService,
        private activityMapper: ActivityMapper) {
        this.pageMapper = new ActivityPageMapper(this.activityMapper);

        this.currentUserService.getCurrentUser()
            .subscribe((currentUser) => {
                if (!currentUser) {
                    this.page = null;
                    this.state.next(null);
                }
            });
    }

    public get activity(): Observable<ActivityPage> {
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
        if (!ids.length) {

        }

        return this.httpClient.put<Observable<any>>('activities', {
            ids: ids
        }).pipe(tap(() => {
            this.page.unread -= ids.length;

            this.page.data.filter(e => ids.find(id => id === e.id)).forEach((element) => {
                element.isMarkedAsRead = true;
            });

            this.state.next(this.page);
        }));
    }
}
