import { NgModule } from '@angular/core';

import {
    CommentService,
    MediaService,
    UploaderService,
    UserService
} from 'app/services';

@NgModule({
    providers: [
        CommentService,
        MediaService,
        UploaderService,
        UserService
    ]
})
export class ServiceModule { }
