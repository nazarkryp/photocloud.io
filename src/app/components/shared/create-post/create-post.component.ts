import { Component, Inject, ViewEncapsulation, Optional, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MatSnackBarConfig, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { Post, User, Attachment, Comment, CurrentUser, CreatePostModel } from 'app/common/models';
import { PostService, CommentService } from 'app/services';
import { CurrentUserService } from 'app/infrastructure/services';
import { TokenProvider } from 'app/infrastructure/security';
import { NgProgress } from 'ngx-progressbar';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';

import { environment } from 'app/../environments/environment';

@Component({
    selector: 'app-create-post',
    templateUrl: './create-post.component.html',
    styleUrls: ['./create-post.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class CreatePostComponent implements OnInit, OnDestroy {
    public currentUser: CurrentUser;
    private currentUserSubscription: Subscription;
    public maxItemsCount = 4;

    public attachments: Array<Attachment>;
    public post: CreatePostModel;
    public uploader: FileUploader;

    constructor(
        private postService: PostService,
        private currentUserService: CurrentUserService,
        private progress: NgProgress,
        private tokenProvider: TokenProvider,
        @Optional() public dialogRef: MatDialogRef<CreatePostComponent>) {
        this.uploader = new FileUploader({
            url: environment.apiUri + 'attachments'
        });
        this.post = new CreatePostModel();
        this.attachments = new Array<Attachment>();

        this.currentUserSubscription = this.currentUserService.getCurrentUser()
            .subscribe(currentUser => {
                this.currentUser = currentUser;
            });
    }

    public ngOnInit() {
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

    public ngOnDestroy() {
        this.currentUserSubscription.unsubscribe();
    }

    public createPost() {
        this.post.AttachmentIds = this.attachments.map((attachment) => {
            return attachment.id;
        });

        this.postService.createPost(this.post)
            .subscribe(createdPost => {
                createdPost.user.pictureUri = this.currentUser.pictureUri;
                this.dialogRef.close(createdPost);
            });
    }

    public getAuthenticationOptions(): Observable<FileUploaderOptions> {
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
