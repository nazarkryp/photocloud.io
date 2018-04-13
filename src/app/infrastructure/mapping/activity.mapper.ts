import { Injectable } from '@angular/core';

import { UserMapper } from 'app/infrastructure/mapping/user.mapper';

import { ActivityResponse } from 'app/models/response';
import { ActivityViewModel } from 'app/models/view';
import { IMapper } from './mapper';

@Injectable()
export class ActivityMapper implements IMapper<ActivityResponse, ActivityViewModel> {
    constructor(
        private userMapper: UserMapper) { }

    public mapFromResponseArray(responseArray: ActivityResponse[]): ActivityViewModel[] {
        if (!responseArray) {
            return null;
        }

        return responseArray.map(e => this.mapFromResponse(e));
    }

    public mapFromResponse(response: ActivityResponse): ActivityViewModel {
        const activity = new ActivityViewModel();

        activity.user = this.userMapper.mapFromResponse(response.user);
        activity.activityType = response.activityType;
        activity.date = response.date;

        return activity;
    }
}
