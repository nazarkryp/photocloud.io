import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { ActivityPage } from 'app/models/view';
import { ActivityService } from 'app/services';

@Injectable()
export class ActivityResolver implements Resolve<ActivityPage> {
    constructor(
        private activityService: ActivityService) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ActivityPage> {
        return this.activityService.getRecentActivity();
    }
}
