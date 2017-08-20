import { Component, Inject, ViewEncapsulation, Optional, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { MdDialogRef, MdSnackBarConfig, MdSnackBar, MD_DIALOG_DATA } from '@angular/material';
import { Observable, Subscription } from 'rxjs/Rx';

import { UserProvider } from '../../../infrastructure/providers';
import { Post, User, Attachment, Comment, CurrentUser } from '../../../common/models';
import { AccountService, PostService, CommentService } from '../../../services';
import { NgProgressService } from 'ngx-progressbar';

@Component({
    selector: 'app-post-details',
    templateUrl: './post-details.component.html',
    styleUrls: ['./post-details.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class PostDetailsComponent implements OnInit, OnDestroy {
    private isDialog: boolean;
    @Output() public onRemoved = new EventEmitter<Post>();

    private text: string;
    private shareLink: string;

    private currentUser: CurrentUser;
    private currentUserSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private postService: PostService,
        private userProvider: UserProvider,
        private commentService: CommentService,
        private progressService: NgProgressService,
        private accountService: AccountService,
        private snackBar: MdSnackBar,
        @Optional() public dialogRef: MdDialogRef<PostDetailsComponent>,
        @Optional() @Inject(MD_DIALOG_DATA) public post: Post,
        @Inject(DOCUMENT) private document: any) {
        if (post) {
            this.post.activeAttachment = 0;
            this.isDialog = true;
        }

        this.userProvider.getCurrentUserAsObservable()
            .subscribe(currentUser => {
                this.currentUser = currentUser;
            });
    }

    private next(): void {
        if (this.post.activeAttachment < this.post.attachments.length - 1) {
            this.post.activeAttachment++;
        }
    }

    private previous(): void {
        if (this.post.activeAttachment > 0) {
            this.post.activeAttachment--;
        }
    }

    private remove(): void {
        this.onRemoved.emit(this.post);
    }

    private share(): string {
        const pathArray = this.document.location.href.split('/');
        const protocol = pathArray[0];
        const host = pathArray[2];

        return protocol + '//' + host + '/p/' + this.post.id;
    }

    private showToast(message: string) {
        const config = new MdSnackBarConfig();
        config.duration = 1500;
        const result = this.snackBar.open(message, null, config);
    }

    createComment() {
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

    private like() {
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

    private getPost(postId: number) {
        this.progressService.start();

        this.postService.getPostById(postId)
            .finally(() => {
                this.progressService.done();
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
