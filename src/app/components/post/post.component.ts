import { Component, ViewEncapsulation, OnInit, OnDestroy, Input, Output, EventEmitter, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { MdSnackBar, MdDialog, MdSnackBarConfig } from '@angular/material';
import { Observable, Subscription } from 'rxjs/Rx';

import { UserProvider } from '../../infrastructure/providers';
import { Post, Attachment, User, Comment, CurrentUser } from '../../common/models';
import { CommentService, PostService } from '../../services';
import { UsersComponent } from '../shared/users/users.component';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class PostComponent implements OnInit, OnDestroy {
    @Input() public post: Post;
    @Output() public onRemoved = new EventEmitter<Post>();

    private text: string;
    private shareLink: string;
    private caption: string;

    private currentUser: CurrentUser;
    private currentUserSubscription: Subscription;

    constructor(
        public dialog: MdDialog,
        public snackBar: MdSnackBar,
        private commentService: CommentService,
        private postService: PostService,
        private userProvider: UserProvider,
        @Inject(DOCUMENT) private document: any
    ) {
        this.currentUserSubscription = this.userProvider.getCurrentUserAsObservable()
            .subscribe(currentUser => {
                this.currentUser = currentUser;
            });
    }

    private next() {
        if (this.post.activeAttachment < this.post.attachments.length - 1) {
            this.post.activeAttachment++;
        }
    }

    private previous() {
        if (this.post.activeAttachment > 0) {
            this.post.activeAttachment--;
        }
    }

    private remove() {
        this.onRemoved.emit(this.post);
    }

    private share() {
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

    private createComment() {
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

    private edit() {
        this.caption = this.post.caption;
        this.post.editing = true;
    }

    private update() {
        this.post.editing = false;
        this.post.caption = this.caption;
        const backup = this.post.caption;
        this.postService.update(this.post)
            .subscribe((post) => {
                this.post.caption = post.caption;
            }, (error) => {
                this.post.caption = backup;
            });
    }

    private cancel() {
        this.post.editing = false;
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

    private openLikesDialog(post: Post) {
        const usersObservable = this.postService.getLikes(post.id);
        const dialogRef = this.dialog.open(UsersComponent, {
            data: usersObservable
        });
    }

    public ngOnInit() {
        if (this.post) {
            this.post.activeAttachment = 0;
        }
    }

    public ngOnDestroy() {
        this.currentUserSubscription.unsubscribe();
    }
}
