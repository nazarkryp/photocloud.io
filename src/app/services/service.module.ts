import { NgModule } from '@angular/core';

import {
    CommentService,
    PostService,
    UploaderService,
    UserService,
    MessagingService
} from 'app/services';

@NgModule({
    providers: [
        CommentService,
        MessagingService,
        PostService,
        UploaderService,
        UserService
    ]
})
export class ServiceModule { }
