import { Injectable } from '@angular/core';

import { IMapper } from './mapper';
import { UserMapper } from './user.mapper';
import { MediaMapper } from './media.mapper';
import { CommentMapper } from './comment.mapper';


import { ActivityResponse } from 'app/models/response';
import { ActivityViewModel } from 'app/models/view';

@Injectable()
export class ActivityMapper implements IMapper<ActivityResponse, ActivityViewModel> {
    constructor(
        private commentMapper: CommentMapper,
        private mediaMapper: MediaMapper,
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

        if (response.media) {
            activity.media = this.mediaMapper.mapFromResponse(response.media);
        }

        if (response.comment) {
            activity.comment = this.commentMapper.mapFromResponse(response.comment);
        }

        return activity;
    }
}
