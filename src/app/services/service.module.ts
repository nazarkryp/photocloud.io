import { NgModule } from '@angular/core';

import {
    CommentService,
    PostService,
    UploaderService,
    UserService
} from 'app/services';

@NgModule({
    providers: [
        CommentService,
        PostService,
        UploaderService,
        UserService
    ]
})
export class ServiceModule { }
