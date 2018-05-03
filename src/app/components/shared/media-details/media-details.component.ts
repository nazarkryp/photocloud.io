import { Component, Inject, ViewEncapsulation, Optional, OnInit, OnDestroy, Input, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { trigger, animate, style, transition, animateChild, group, query, stagger } from '@angular/animations';
import { MatDialogRef, MatSnackBarConfig, MatSnackBar, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';

import { ConfirmComponent } from 'app/components/shared/confirm/confirm.component';

import { CurrentUserService } from 'app/infrastructure/services';
import { MediaViewModel, UserViewModel, CommentViewModel, CurrentUserViewModel, UpdateMediaViewModel, UpdateAttachmentViewModel } from 'app/models/view';
import { MediaService, CommentService } from 'app/services';
import { NgProgress } from 'ngx-progressbar';
import { EditMediaService, LikeService } from 'app/shared/services';
import { UserDialogDetails } from 'app/components/shared/users-dialog/models';
import { CommentsComponent } from 'app/components/shared/comments/comments.component';
import { finalize } from 'rxjs/operators';

@Component({
    templateUrl: './media-details.component.html',
    styleUrls: ['./media-details.component.css'],
    animations: [
        trigger('content', [
            transition(':enter', [
                query('.transition-content', [
                    style({ transform: 'translateX(50px)', opacity: 0 }),
                    stagger(0, [
                        animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style('*'))
                    ])
                ])
            ])
        ])
    ]
})
export class MediaDetailsComponent implements OnInit, OnDestroy {
    public isDialog: boolean;
    @ViewChild('player') public player: any;
    @ViewChild('commentsComponent') public commentsComponent: CommentsComponent;
    public usersConfig: any;

    public updateMediaModel: UpdateMediaViewModel;
    public text: string;
    public showCommentBox: boolean;
    public shareLink: string;
    public currentUser: CurrentUserViewModel;
    public currentUserSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private mediaService: MediaService,
        private currentUserService: CurrentUserService,
        private commentService: CommentService,
        private editMediaService: EditMediaService,
        private likeService: LikeService,
        private progress: NgProgress,
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
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

    public next() {
        if (this.player && !this.player.nativeElement.paused) {
            this.player.nativeElement.pause();
        }

        if (this.media.activeAttachment < this.media.attachments.length - 1) {
            this.media.activeAttachment++;
        }
    }

    public previous() {
        if (this.player && !this.player.nativeElement.paused) {
            this.player.nativeElement.pause();
        }

        if (this.media.activeAttachment > 0) {
            this.media.activeAttachment--;
        }
    }

    public play() {
        if (!this.player || this.media.attachments[this.media.activeAttachment].type !== 1) {
            return;
        }

        if (this.player.nativeElement.paused) {
            this.player.nativeElement.play();
        } else {
            this.player.nativeElement.pause();
        }
    }

    public remove(): void {
        this.dialog.open(ConfirmComponent, {
            data: {
                title: 'DELETE POST',
                message: 'Are you sure you want you want to delete this media?'
            }
        }).afterClosed().subscribe(confirmed => {
            if (confirmed) {
                this.dialogRef.close(true);
            }
        });
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

        this.showCommentBox = false;
        this.media.commentsCount++;

        this.commentsComponent.createComment(comment);

        this.commentService.createComment(this.media.id, { text: text })
            .subscribe(createdComment => {
                comment.id = createdComment.id;
                comment.date = createdComment.date;
            }, () => {
                this.media.commentsCount--;
                this.commentsComponent.removeComment(comment);
            });
    }

    public like() {
        this.likeService.like(this.media).subscribe(() => {
        }, () => { });
    }

    public edit() {
        this.updateMediaModel = this.editMediaService.createUpdateModel(this.media);
        this.media.editing = true;
    }

    public select(attachment: UpdateAttachmentViewModel) {
        this.editMediaService.select(this.updateMediaModel, attachment);
    }

    public removeAttachment(attachmentToRemove: UpdateAttachmentViewModel) {
        this.editMediaService.removeAttachment(this.updateMediaModel, attachmentToRemove);
    }

    public restoreRemovedAttachment(attachmentToRestore: UpdateAttachmentViewModel) {
        this.editMediaService.restoreAttachment(this.updateMediaModel, attachmentToRestore);
    }

    public update() {
        this.editMediaService.updateMedia(this.media, this.updateMediaModel);
    }

    public cancel() {
        this.editMediaService.cancel(this.media, this.updateMediaModel);
    }

    public getMedia(mediaId: number) {
        this.progress.start();

        this.mediaService.getMediaById(mediaId)
            .pipe(finalize(() => {
                this.progress.done();
            }))
            .subscribe(media => {
                this.media = media;
                this.media.activeAttachment = 0;
            });
    }

    public inspectLikes(event) {
        // this.usersConfig = {
        //     usersObservable: this.mediaService.getLikes(this.media.id),
        //     title: 'Likes'
        // };

        // this.media.inspectingLikes = true;
    }

    public likesClose() {
        this.media.inspectingLikes = false;
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
