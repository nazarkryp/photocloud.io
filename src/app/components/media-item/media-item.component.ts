import { Component, ViewEncapsulation, OnInit, OnDestroy, Input, Output, EventEmitter, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatSnackBar, MatDialog, MatSnackBarConfig } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { CurrentUserService } from 'app/infrastructure/services';
import { MediaViewModel, UserViewModel, CommentViewModel, CurrentUserViewModel, UpdateMediaViewModel, UpdateAttachmentViewModel } from 'app/models/view';
import { CommentService, MediaService } from 'app/services';
import { UsersComponent } from 'app/components/shared/users/users.component';
import { trigger, style, animate, transition } from '@angular/animations';
import { EditMediaService, LikeService } from 'app/shared/services';

@Component({
    selector: 'app-media-item',
    templateUrl: './media-item.component.html',
    styleUrls: ['./media-item.component.css'],
    animations: [
        trigger('enterTransition', [
            transition(':enter', [
                style({ transform: 'translateX(50px)', opacity: 0 }),
                animate('1200ms cubic-bezier(0.35, 0, 0.25, 1)', style('*'))
            ])
        ])
    ]
})
export class MediaItemComponent implements OnInit, OnDestroy {
    @Input() public media: MediaViewModel;
    @Output() public onRemoved = new EventEmitter<MediaViewModel>();
    @ViewChild('player') public player: any;

    public text: string;
    public shareLink: string;
    public updateMediaModel: UpdateMediaViewModel;

    public currentUser: CurrentUserViewModel;
    public currentUserSubscription: Subscription;

    constructor(
        public dialog: MatDialog,
        public snackBar: MatSnackBar,
        private commentService: CommentService,
        private mediaService: MediaService,
        private currentUserService: CurrentUserService,
        private editMediaService: EditMediaService,
        private likeService: LikeService,
        @Inject(DOCUMENT) private document: any
    ) {
        this.currentUserSubscription = this.currentUserService.getCurrentUser()
            .subscribe(currentUser => {
                this.currentUser = currentUser;
            });
    }

    public next() {
        if (this.media.activeAttachment < this.media.attachments.length - 1) {
            this.media.activeAttachment++;
        }
    }

    public previous() {
        if (this.media.activeAttachment > 0) {
            this.media.activeAttachment--;
        }
    }

    public remove() {
        this.onRemoved.emit(this.media);
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

    public share() {
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

    public edit() {
        this.updateMediaModel = this.editMediaService.createUpdateModel(this.media);
        this.media.editing = true;
    }

    public removeAttachment(attachmentToRemove: UpdateAttachmentViewModel) {
        this.editMediaService.removeAttachment(this.updateMediaModel, attachmentToRemove);
    }

    public update() {
        this.editMediaService.updateMedia(this.media, this.updateMediaModel);
    }

    public cancel() {
        this.media.editing = false;
        this.updateMediaModel = null;
    }

    public like() {
        this.likeService.like(this.media);
    }

    public openLikesDialog(media: MediaViewModel) {
        const usersObservable = this.mediaService.getLikes(media.id);
        const dialogRef = this.dialog.open(UsersComponent, {
            data: {
                usersObservable: usersObservable,
                title: 'Likes'
            }
        });
    }

    public ngOnInit() {
        if (this.media) {
            this.media.activeAttachment = 0;
        }
    }

    public ngOnDestroy() {
        this.currentUserSubscription.unsubscribe();
    }
}
