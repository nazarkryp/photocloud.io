import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { UserService } from 'app/services/user.service';
import { UserViewModel } from 'app/models/view';

@Injectable()
export class IncommingRequestsService {
    private state: ReplaySubject<number> = new ReplaySubject<number>(1);
    private incommingRequestsCount: number;

    constructor(
        private userService: UserService) { }

    public get incommingRequests() {
        return this.state.asObservable();
    }

    public getIncommingRequests(): Observable<UserViewModel[]> {
        return this.userService.getIncommingRequests()
            .do(incommingRequests => {
                if (!this.incommingRequestsCount || this.incommingRequestsCount !== incommingRequests.length) {
                    this.incommingRequestsCount = incommingRequests.length;
                    this.state.next(this.incommingRequestsCount);
                }
            });
    }

    public updateIncommingRequestsCount(count: number) {
        this.incommingRequestsCount = count;
        this.state.next(this.incommingRequestsCount);
    }
}
