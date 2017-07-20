import { Component, Inject, ViewEncapsulation, Optional, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MdDialogRef, MdSnackBarConfig, MdSnackBar, MD_DIALOG_DATA } from '@angular/material';
import { Post, User, Attachment, Comment, CurrentUser, CreatePostModel } from '../../../common/models';
import { AccountService, PostService, CommentService } from '../../../services';
import { TokenService } from '../../../infrastructure/security/token.service';
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
        private tokenService: TokenService,
        @Optional() public dialogRef: MdDialogRef<CreatePostComponent>) {
        this.uploader = new FileUploader({
            url: environment.apiUri + 'attachments'
        });
        this.post = new CreatePostModel();
        this.attachments = new Array<Attachment>();
    }

    async ngOnInit() {
        this.currentUser = this.accountService.getCurrentUser();

        const options = await this.getAuthenticationOptions();
        this.uploader.setOptions(options);

        this.uploader.onAfterAddingFile = (file) => {
            file.upload();
        }

        this.uploader.onCompleteItem = (item: any, json: any, status: any, headers: any) => {
            const response = JSON.parse(json);
            const attachment = response as Attachment;
            this.attachments.push(attachment);
        };
    }

    async createPost() {
        try {
            this.post.AttachmentIds = this.attachments.map((attachment) => {
                return attachment.id;
            });

            const createdPost = await this.postService.createPost(this.post);
        } catch (error) { } finally { }
    }

    private async getAuthenticationOptions(): Promise<FileUploaderOptions> {
        const accessToken = await this.tokenService.getAccessToken();
        const bearerToken = `Bearer ${accessToken.accessToken}`;
        const headers: Array<{ name: string; value: string; }> = [];
        headers.push({ name: 'Authorization', value: bearerToken });
        const options = <FileUploaderOptions>{ headers: headers };

        return options;
    }
}
