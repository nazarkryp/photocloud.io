import { Component, OnInit, Input, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { MediaViewModel, CommentViewModel, UserViewModel, CurrentUserViewModel } from 'app/models/view';
import { LikeService } from 'app/shared/services';
import { CommentsComponent } from 'app/components/shared/comments/comments.component';
import { CommentService } from 'app/services';
import { CurrentUserService } from 'app/infrastructure/services';
import { CommentBoxComponent } from '../shared/comment-box/comment-box.component';

@Component({
    selector: 'app-media-view',
    templateUrl: './media-view.component.html',
    styleUrls: ['./media-view.component.css']
})
export class MediaViewComponent implements OnInit {
    private currentUser: CurrentUserViewModel;

    @ViewChild('attachment')
    private attachment: ElementRef;
    @ViewChild('commentBox')
    public commentBox: CommentBoxComponent;
    @ViewChild('player')
    public player: any;
    @ViewChild('commentsComponent')
    public commentsComponent: CommentsComponent;
    public editing: boolean;

    constructor(
        private ref: MatDialogRef<MediaViewComponent>,
        @Inject(MAT_DIALOG_DATA) public media: MediaViewModel,
        private commentService: CommentService,
        private currentUserService: CurrentUserService,
        private likeService: LikeService
    ) {
        this.currentUser = this.currentUserService.retrieveCurrentUser();
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

        if (!this.player.nativeElement.ontimeupdate) {
            this.player.nativeElement.ontimeupdate = (event) => {
                const progress = (this.player.nativeElement.currentTime * 100) / this.player.nativeElement.duration;
                this.media.attachments[this.media.activeAttachment].progress = progress;
            };
        }
    }

    public like() {
        this.likeService.like(this.media).subscribe(() => { }, () => { });
    }

    public createComment(text) {
        const result = this.commentService.addComment(this.media, text);

        this.commentsComponent.createComment(result.comment);

        result.commentObservable.subscribe(() => { }, (error) => {
            this.commentsComponent.removeComment(result.comment);
        });
    }

    public ngOnInit() {
        // const image = this.attachment.nativeElement;

        // console.log(window.innerHeight);
        // image.onload = (event) => {
        //     console.log(`${image.clientWidth} ${image.clientHeight}`);
        // };
    }
}
