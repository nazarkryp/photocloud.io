import { Component, Inject, ViewEncapsulation, Optional, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { MatDialogRef, MatSnackBarConfig, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { UserProvider } from 'app/infrastructure/providers';
import { Post, User, Attachment, Comment, CurrentUser } from 'app/common/models';
import { PostService, CommentService } from 'app/services';
import { NgProgress } from 'ngx-progressbar';

@Component({
    selector: 'app-post-details',
    templateUrl: './post-details.component.html',
    styleUrls: ['./post-details.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class PostDetailsComponent implements OnInit, OnDestroy {
    public isDialog: boolean;
    @Output() public onRemoved = new EventEmitter<Post>();

    public text: string;
    public shareLink: string;

    public currentUser: CurrentUser;
    public currentUserSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private postService: PostService,
        private userProvider: UserProvider,
        private commentService: CommentService,
        private progress: NgProgress,
        private snackBar: MatSnackBar,
        @Optional() public dialogRef: MatDialogRef<PostDetailsComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public post: Post,
        @Inject(DOCUMENT) private document: any) {
        if (post) {
            this.post.activeAttachment = 0;
            this.isDialog = true;
        }

        this.currentUserSubscription = this.userProvider.getCurrentUserAsObservable()
            .subscribe(currentUser => {
                this.currentUser = currentUser;
            });
    }

    public next(): void {
        if (this.post.activeAttachment < this.post.attachments.length - 1) {
            this.post.activeAttachment++;
        }
    }

    public previous(): void {
        if (this.post.activeAttachment > 0) {
            this.post.activeAttachment--;
        }
    }

    public remove(): void {
        this.onRemoved.emit(this.post);
    }

    public share(): string {
        const pathArray = this.document.location.href.split('/');
        const protocol = pathArray[0];
        const host = pathArray[2];

        return protocol + '//' + host + '/p/' + this.post.id;
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

        if (!this.post.comments) {
            this.post.comments = new Array<Comment>();
        }

        const comment = new Comment();
        comment.text = text;
        comment.date = new Date();
        comment.user = new User();
        comment.user.id = this.currentUser.id;
        comment.user.username = this.currentUser.username;

        this.post.comments.push(comment);

        this.commentService.createComment(this.post.id, { text: text })
            .subscribe(createdComment => {
                comment.id = createdComment.id;
                comment.date = createdComment.date;
            }, () => {
                const failedCommentIndex = this.post.comments.findIndex(c => !c.id);
                this.post.comments.splice(failedCommentIndex, 1);
            });

    }

    public like() {
        if (this.post.userHasLiked) {
            this.post.likesCount--;
            this.post.userHasLiked = !this.post.userHasLiked;
            this.postService.removePostLike(this.post.id)
                .subscribe(() => {
                    this.post.userHasLiked = false;
                }, (error) => {
                    if (this.post.userHasLiked) {
                        this.post.likesCount--;
                    } else {
                        this.post.likesCount++;
                    }
                    this.post.userHasLiked = !this.post.userHasLiked;
                    return error;
                });
        } else {
            this.post.likesCount++;
            this.post.userHasLiked = !this.post.userHasLiked;
            this.postService.likePost(this.post.id)
                .subscribe(() => {
                    this.post.userHasLiked = true;
                }, (error) => {
                    if (this.post.userHasLiked) {
                        this.post.likesCount--;
                    } else {
                        this.post.likesCount++;
                    }
                    this.post.userHasLiked = !this.post.userHasLiked;
                    return error;
                });
        }
    }

    public getPost(postId: number) {
        this.progress.start();

        this.postService.getPostById(postId)
            .finally(() => {
                this.progress.done();
            })
            .subscribe(post => {
                this.post = post;
                this.post.activeAttachment = 0;
            });
    }

    public ngOnInit(): void {
        if (!this.post) {
            this.route.params.subscribe(params => {
                const postId = params['postId'];

                this.getPost(postId);
            });
        }
    }

    public ngOnDestroy() {
        this.currentUserSubscription.unsubscribe();
    }
}
