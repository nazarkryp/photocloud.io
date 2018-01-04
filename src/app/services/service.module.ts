import { NgModule } from '@angular/core';

import {
    CommentService,
    MediaService,
    UploaderService,
    UserService,
    IncommingRequestsService
} from 'app/services';

@NgModule({
    providers: [
        CommentService,
        MediaService,
        UploaderService,
        UserService,
        IncommingRequestsService
    ]
})
export class ServiceModule { }
