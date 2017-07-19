import { Component, Inject, ViewEncapsulation, Optional, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MdDialogRef, MdSnackBarConfig, MdSnackBar, MD_DIALOG_DATA } from '@angular/material';
import { Post, User, Attachment, Comment, CurrentUser } from '../../../common/models';
import { AccountService, PostService, CommentService } from '../../../services';
import { NgProgressService } from 'ngx-progressbar';
import { FileUploader } from 'ng2-file-upload';

@Component({
    selector: 'app-create-post',
    templateUrl: './create-post.component.html',
    styleUrls: ['./create-post.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class CreatePostComponent implements OnInit {
    private currentUser: CurrentUser;
    private maxItemsCount = 4;
    private attachments: Array<Attachment> = new Array<Attachment>();

    public uploader: FileUploader = new FileUploader({ url: '' });

    constructor(
        private postService: PostService,
        private progressService: NgProgressService,
        private accountService: AccountService,
        @Optional() public dialogRef: MdDialogRef<CreatePostComponent>) {
    }

    getItem(item: any) {
        return JSON.stringify(item);
    }

    ngOnInit() {
        this.currentUser = this.accountService.getCurrentUser();
    }
}
