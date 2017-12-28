import { Component, Inject, ViewEncapsulation, Optional, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MatSnackBarConfig, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { MediaViewModel, UserViewModel, AttachmentViewModel, CommentViewModel, CurrentUserViewModel, CreateMediaModel } from 'app/models/view';
import { MediaService, CommentService } from 'app/services';
import { CurrentUserService } from 'app/infrastructure/services';
import { TokenProvider } from 'app/infrastructure/security';
import { NgProgress } from 'ngx-progressbar';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';

import { environment } from 'app/../environments/environment';

@Component({
    selector: 'app-create-media',
    templateUrl: './create-media.component.html',
    styleUrls: ['./create-media.component.css']
})
export class CreateMediaComponent implements OnInit, OnDestroy {
    public currentUser: CurrentUserViewModel;
    private currentUserSubscription: Subscription;
    public maxItemsCount = 4;

    public attachments: Array<AttachmentViewModel>;
    public media: CreateMediaModel;
    public uploader: FileUploader;

    constructor(
        private mediaService: MediaService,
        private currentUserService: CurrentUserService,
        private progress: NgProgress,
        private tokenProvider: TokenProvider,
        @Optional() public dialogRef: MatDialogRef<CreateMediaComponent>) {
        this.uploader = new FileUploader({
            url: environment.apiUri + 'attachments'
        });
        this.media = new CreateMediaModel();
        this.attachments = new Array<AttachmentViewModel>();

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
            const attachment = response as AttachmentViewModel;
            this.attachments.push(attachment);
        };
    }

    public ngOnDestroy() {
        this.currentUserSubscription.unsubscribe();
    }

    public createPost() {
        this.media.attachmentIds = this.attachments.map((attachment) => {
            return attachment.id;
        });

        this.mediaService.createMedia(this.media)
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

    public setAsDefault(item) {
        console.log(item);
    }
}
