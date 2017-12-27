import { Component, Inject, ViewEncapsulation, Optional, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { MatDialogRef, MatSnackBarConfig, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import {
    TdBounceAnimation,
    TdFlashAnimation,
    TdHeadshakeAnimation,
    TdJelloAnimation,
    TdPulseAnimation
} from '@covalent/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { CurrentUserService } from 'app/infrastructure/services';
import { MediaViewModel, UserViewModel, AttachmentViewModel, CommentViewModel, CurrentUserViewModel, UpdateMediaModel } from 'app/models/view';
import { MediaService, CommentService } from 'app/services';
import { NgProgress } from 'ngx-progressbar';
import { EditMediaService } from 'app/shared/services';

@Component({
    selector: 'app-media-details',
    templateUrl: './media-details.component.html',
    styleUrls: ['./media-details.component.css'],
    animations: [
        TdBounceAnimation(),                    // using implicit anchor name 'tdBounce' in template
        TdFlashAnimation(),                     // using implicit anchor name 'tdFlash' in template
        TdHeadshakeAnimation(),                 // using implicit anchor name 'tdHeadshake' in template
        TdJelloAnimation(),                     // using implicit anchor name 'tdJello' in template
        TdPulseAnimation({ duration: 200 })     // using implicit anchor name 'tdPulse' in template
    ],
    encapsulation: ViewEncapsulation.None
})
export class MediaDetailsComponent implements OnInit, OnDestroy {
    public bounceState = false;
    public isDialog: boolean;
    @Output() public onRemoved = new EventEmitter<MediaViewModel>();
    @ViewChild('player') public player: any;

    public updateMediaModel: UpdateMediaModel;
    public text: string;
    public shareLink: string;
    public currentUser: CurrentUserViewModel;
    public currentUserSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private mediaService: MediaService,
        private currentUserService: CurrentUserService,
        private commentService: CommentService,
        private editMediaService: EditMediaService,
        private progress: NgProgress,
        private snackBar: MatSnackBar,
        @Optional() public dialogRef: MatDialogRef<MediaDetailsComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public media: MediaViewModel,
        @Inject(DOCUMENT) private document: any) {
        if (this.media) {
            this.media.activeAttachment = 0;
            this.isDialog = true;
        }

        this.currentUserSubscription = this.currentUserService.getCurrentUser()
            .subscribe(currentUser => {
                this.currentUser = currentUser;
            });
    }

    public next(): void {
        if (this.media.activeAttachment < this.media.attachments.length - 1) {
            this.media.activeAttachment++;
        }
    }

    public previous(): void {
        if (this.media.activeAttachment > 0) {
            this.media.activeAttachment--;
        }
    }

    public play(event: any) {
        if (!this.player) {
            return;
        }

        if (this.player.nativeElement.paused) {
            this.player.nativeElement.play();
        } else {
            this.player.nativeElement.pause();
        }
    }

    public remove(): void {
        this.onRemoved.emit(this.media);
    }

    public share(): string {
        const pathArray = this.document.location.href.split('/');
        const protocol = pathArray[0];
        const host = pathArray[2];

        return protocol + '//' + host + '/p/' + this.media.id;
    }

    public showToast(message: string) {
        const config = new MatSnackBarConfig();
        config.duration = 1500;
        const result = this.snackBar.open(message, null, config);
    }

    public createComment() {
        if (!this.text) {
            return;
        }

        const text = this.text;
        this.text = '';

        if (!this.media.comments) {
            this.media.comments = new Array<CommentViewModel>();
        }

        const comment = new CommentViewModel();
        comment.text = text;
        comment.date = new Date();
        comment.user = new UserViewModel();
        comment.user.id = this.currentUser.id;
        comment.user.username = this.currentUser.username;

        this.media.comments.push(comment);

        this.commentService.createComment(this.media.id, { text: text })
            .subscribe(createdComment => {
                comment.id = createdComment.id;
                comment.date = createdComment.date;
            }, () => {
                const failedCommentIndex = this.media.comments.findIndex(c => !c.id);
                this.media.comments.splice(failedCommentIndex, 1);
            });

    }

    public like() {
        this.bounceState = !this.bounceState;
        if (this.media.userHasLiked) {
            this.media.likesCount--;
            this.media.userHasLiked = !this.media.userHasLiked;
            this.mediaService.removeMediaLike(this.media.id)
                .subscribe(() => {
                    this.media.userHasLiked = false;
                }, (error) => {
                    if (this.media.userHasLiked) {
                        this.media.likesCount--;
                    } else {
                        this.media.likesCount++;
                    }
                    this.media.userHasLiked = !this.media.userHasLiked;
                    return error;
                });
        } else {
            this.media.likesCount++;
            this.media.userHasLiked = !this.media.userHasLiked;
            this.mediaService.addMediaLike(this.media.id)
                .subscribe(() => {
                    this.media.userHasLiked = true;
                }, (error) => {
                    if (this.media.userHasLiked) {
                        this.media.likesCount--;
                    } else {
                        this.media.likesCount++;
                    }
                    this.media.userHasLiked = !this.media.userHasLiked;
                    return error;
                });
        }
    }

    public edit() {
        this.updateMediaModel = this.editMediaService.createUpdateModel(this.media);
        this.media.editing = true;
    }

    public removeAttachment(attachmentToRemove: AttachmentViewModel) {
        this.editMediaService.removeAttachment(this.updateMediaModel, attachmentToRemove);
    }

    public update() {
        this.editMediaService.update(this.media, this.updateMediaModel);
    }

    public cancel() {
        this.media.editing = false;
        this.updateMediaModel = null;
    }

    public getMedia(mediaId: number) {
        this.progress.start();

        this.mediaService.getMediaById(mediaId)
            .finally(() => {
                this.progress.done();
            })
            .subscribe(media => {
                this.media = media;
                this.media.activeAttachment = 0;
            });
    }

    public ngOnInit(): void {
        if (!this.media) {
            this.route.params.subscribe(params => {
                const mediaId = params['mediaId'];

                this.getMedia(mediaId);
            });
        }
    }

    public ngOnDestroy() {
        this.currentUserSubscription.unsubscribe();
    }
}
