import { Component, Inject, ViewEncapsulation, Optional, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MatSnackBarConfig, MatSnackBar, MAT_DIALOG_DATA, MatSlideToggleChange } from '@angular/material';

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
    templateUrl: './create-media.component.html',
    styleUrls: ['./create-media.component.css']
})
export class CreateMediaComponent implements OnInit, OnDestroy {
    public currentUser: CurrentUserViewModel;
    private currentUserSubscription: Subscription;
    public maxItemsCount = 4;

    public media: CreateMediaModel;
    public uploader: FileUploader;

    constructor(
        private mediaService: MediaService,
        private currentUserService: CurrentUserService,
        private progress: NgProgress,
        private tokenProvider: TokenProvider,
        @Optional() public dialogRef: MatDialogRef<CreateMediaComponent>) {
        this.currentUser = this.currentUserService.retrieveCurrentUser();
        this.media = new CreateMediaModel();
        this.uploader = new FileUploader({ url: `${environment.apiUri}attachments` });
    }

    public ngOnInit() {
        const options = this.getAuthenticationOptions();
        this.uploader.setOptions(options);

        this.uploader.onAfterAddingFile = (file) => {
            file.upload();
        }

        this.uploader.onCompleteItem = (item: any, json: any, status: any, headers: any) => {
            const response = JSON.parse(json);
            const attachment = response as AttachmentViewModel;
            this.media.attachments.push(attachment);

            if (this.media.attachments.length === 1) {
                this.media.coverId = this.media.attachments[0].id;
            }
        };
    }

    public ngOnDestroy() {
        this.currentUserSubscription.unsubscribe();
    }

    public createMedia() {
        this.progress.start();
        this.mediaService.createMedia(this.media)
            .finally(() => {
                this.progress.done()
            })
            .subscribe(createdPost => {
                createdPost.user.pictureUri = this.currentUser.pictureUri;
                this.dialogRef.close(createdPost);
            });
    }

    public close() {
        this.dialogRef.close();
    }

    private getAuthenticationOptions(): FileUploaderOptions {
        const headers: Array<{ name: string; value: string; }> = [];
        const accessToken = this.tokenProvider.retrieveAccessToken();

        headers.push({ name: 'Authorization', value: `Bearer ${accessToken.accessToken}` });

        return <FileUploaderOptions>{ headers: headers };
    }

    public select(index) {
        this.media.selectedAttachmentIndex = index;
    }

    public change(toggleChange: MatSlideToggleChange) {
        if (toggleChange.checked) {
            this.media.coverId = this.media.attachments[this.media.selectedAttachmentIndex].id;
        } else {
            this.media.coverId = this.media.attachments[0].id;
        }
    }
}
