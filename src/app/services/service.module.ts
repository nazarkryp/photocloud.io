import { NgModule } from '@angular/core';

import {
    CommentService,
    MediaService,
    UploaderService,
    UserService,
    RequestsService
} from 'app/services';

@NgModule({
    providers: [
        CommentService,
        MediaService,
        UploaderService,
        UserService,
        RequestsService
    ]
})
export class ServiceModule { }
