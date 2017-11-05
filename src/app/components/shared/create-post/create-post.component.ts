import { Component, Inject, ViewEncapsulation, Optional, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MatSnackBarConfig, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { Post, User, Attachment, Comment, CurrentUser, CreatePostModel } from '../../../common/models';
import { AccountService, PostService, CommentService } from '../../../services';
import { UserProvider } from '../../../infrastructure/providers';
import { TokenProvider } from '../../../infrastructure/security';
import { NgProgress } from 'ngx-progressbar';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';

import { environment } from '../../../../environments/environment';

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
        private userProvider: UserProvider,
        private progressService: NgProgress,
        private accountService: AccountService,
        private tokenProvider: TokenProvider,
        @Optional() public dialogRef: MatDialogRef<CreatePostComponent>) {
        this.uploader = new FileUploader({
            url: environment.apiUri + 'attachments'
        });
        this.post = new CreatePostModel();
        this.attachments = new Array<Attachment>();

        this.currentUserSubscription = this.userProvider.getCurrentUserAsObservable()
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
