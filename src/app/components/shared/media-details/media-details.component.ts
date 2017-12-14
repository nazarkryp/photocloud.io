import { Component, Inject, ViewEncapsulation, Optional, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { MatDialogRef, MatSnackBarConfig, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { CurrentUserService } from 'app/infrastructure/services';
import { Media, User, Attachment, Comment, CurrentUser } from 'app/common/models';
import { MediaService, CommentService } from 'app/services';
import { NgProgress } from 'ngx-progressbar';

@Component({
    selector: 'app-media-details',
    templateUrl: './media-details.component.html',
    styleUrls: ['./media-details.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class MediaDetailsComponent implements OnInit, OnDestroy {
    public isDialog: boolean;
    @Output() public onRemoved = new EventEmitter<Media>();

    public text: string;
    public shareLink: string;

    public currentUser: CurrentUser;
    public currentUserSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private mediaService: MediaService,
        private currentUserService: CurrentUserService,
        private commentService: CommentService,
        private progress: NgProgress,
        private snackBar: MatSnackBar,
        @Optional() public dialogRef: MatDialogRef<MediaDetailsComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public media: Media,
        @Inject(DOCUMENT) private document: any) {
        if (media) {
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
            this.media.comments = new Array<Comment>();
        }

        const comment = new Comment();
        comment.text = text;
        comment.date = new Date();
        comment.user = new User();
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
        if (this.media.userHasLiked) {
            this.media.likesCount--;
            this.media.userHasLiked = !this.media.userHasLiked;
            this.mediaService.removePostLike(this.media.id)
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
            this.mediaService.likePost(this.media.id)
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

    public getMedia(mediaId: number) {
        this.progress.start();

        this.mediaService.getPostById(mediaId)
            .finally(() => {
                this.progress.done();
            })
            .subscribe(post => {
                this.media = post;
                this.media.activeAttachment = 0;
            });
    }

    public ngOnInit(): void {
        if (!this.media) {
            this.route.params.subscribe(params => {
                const postId = params['postId'];

                this.getMedia(postId);
            });
        }
    }

    public ngOnDestroy() {
        this.currentUserSubscription.unsubscribe();
    }
}
