import { Injectable } from '@angular/core';

import { Observable, ReplaySubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { UserService } from 'app/services/user.service';
import { UserViewModel, Page, RequestViewModel, PaginationViewModel } from 'app/models/view';
import { PageMapper, UserMapper } from 'app/infrastructure/mapping';
import { UserResponse } from 'app/models/response';

@Injectable()
export class RequestsService {
    private state: ReplaySubject<number> = new ReplaySubject<number>(1);
    private incommingRequestsCount: number;
    private pageMapper: PageMapper<UserResponse, UserViewModel>;

    constructor(
        private userService: UserService,
        private userMapper: UserMapper) {
        this.pageMapper = new PageMapper(userMapper);
    }

    public get incommingRequests() {
        return this.state.asObservable();
    }

    public getIncommingRequests(pagination: PaginationViewModel): Observable<Page<UserViewModel>> {
        return this.userService.getIncommingRequests(pagination)
            .pipe(
                tap(page => {
                    if (!this.incommingRequestsCount || this.incommingRequestsCount !== page.data.length) {
                        this.incommingRequestsCount = page.data.length;
                        this.state.next(this.incommingRequestsCount);
                    }
                }),
                map(response => {
                    return this.pageMapper.mapFromResponse(response);
                })
            );
    }

    public getOutgoingRequests(pagination: PaginationViewModel): Observable<Page<UserViewModel>> {
        return this.userService.getOutgoingRequests(pagination)
            .pipe(map(response => {
                return this.pageMapper.mapFromResponse(response);
            }));
    }

    public updateIncommingRequestsCount(count: number) {
        this.incommingRequestsCount = count;
        this.state.next(this.incommingRequestsCount);
    }
}
