import { NgModule } from '@angular/core';

import {
    ActivityService,
    CommentService,
    MediaService,
    UploaderService,
    UserService,
    RequestsService
} from 'app/services';

@NgModule({
    providers: [
        ActivityService,
        CommentService,
        MediaService,
        UploaderService,
        UserService,
        RequestsService
    ]
})
export class ServiceModule { }
