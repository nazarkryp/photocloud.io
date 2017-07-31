import { Component, Inject, ViewEncapsulation, Optional, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MdDialogRef, MdSnackBarConfig, MdSnackBar, MD_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import { Post, User, Attachment, Comment, CurrentUser, CreatePostModel } from '../../../common/models';
import { AccountService, PostService, CommentService } from '../../../services';
import { TokenProvider } from '../../../infrastructure/security';
import { NgProgressService } from 'ngx-progressbar';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';

import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-create-post',
    templateUrl: './create-post.component.html',
    styleUrls: ['./create-post.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class CreatePostComponent implements OnInit {
    private currentUser: CurrentUser;
    private maxItemsCount = 4;

    private attachments: Array<Attachment>;
    private post: CreatePostModel;

    public uploader: FileUploader;

    constructor(
        private postService: PostService,
        private progressService: NgProgressService,
        private accountService: AccountService,
        private tokenProvider: TokenProvider,
        @Optional() public dialogRef: MdDialogRef<CreatePostComponent>) {
        this.uploader = new FileUploader({
            url: environment.apiUri + 'attachments'
        });
        this.post = new CreatePostModel();
        this.attachments = new Array<Attachment>();
    }

    ngOnInit() {
        this.currentUser = this.accountService.getCurrentUser();

        this.getAuthenticationOptions()
            .subscribe(options => {
                this.uploader.setOptions(options);
            });

        this.uploader.onAfterAddingFile = (file) => {
            file.upload();
        }

        this.uploader.onCompleteItem = (item: any, json: any, status: any, headers: any) => {
            const response = JSON.parse(json);
            const attachment = response as Attachment;
            this.attachments.push(attachment);
        };
    }

    createPost() {
        this.post.AttachmentIds = this.attachments.map((attachment) => {
            return attachment.id;
        });

        this.postService.createPost(this.post)
            .subscribe(createdPost => {
                createdPost.user.pictureUri = this.currentUser.pictureUri;
                this.dialogRef.close(createdPost);
            });
    }

    private getAuthenticationOptions(): Observable<FileUploaderOptions> {
        return this.tokenProvider.getAccessToken()
            .map(accessToken => {
                const bearerToken = `Bearer ${accessToken.accessToken}`;
                const headers: Array<{ name: string; value: string; }> = [];
                headers.push({ name: 'Authorization', value: bearerToken });
                const options = <FileUploaderOptions>{ headers: headers };

                return options;
            });
    }
}
