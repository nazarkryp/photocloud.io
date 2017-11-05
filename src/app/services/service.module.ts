import { NgModule } from '@angular/core';

import {
    AccountService,
    CommentService,
    PostService,
    UploaderService,
    UserService,
    MessagingService
} from 'app/services';

@NgModule({
    providers: [
        AccountService,
        CommentService,
        MessagingService,
        PostService,
        UploaderService,
        UserService
    ]
})
export class ServiceModule { }
