import { Component, Inject, ViewEncapsulation, Optional, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { MdDialogRef, MdSnackBarConfig, MdSnackBar, MD_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { Post, User, Attachment, Comment, CurrentUser } from '../../../common/models';
import { AccountService, PostService, CommentService } from '../../../services';
import { NgProgressService } from 'ngx-progressbar';

@Component({
    selector: 'app-post-details',
    templateUrl: './post-details.component.html',
    styleUrls: ['./post-details.component.css'],
    encapsulation: ViewEncapsulation.Emulated
})
export class PostDetailsComponent implements OnInit {
    private isDialog: boolean;
    @Output() public onRemoved = new EventEmitter<Post>();

    private text: string;
    private shareLink: string;

    private currentUser: CurrentUser;

    constructor(
        private route: ActivatedRoute,
        private postService: PostService,
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

        this.currentUser = this.accountService.getCurrentUser();
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

    private async createComment() {
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

        try {
            this.post.isLoading = true;
            const createdComment = await this.commentService.createComment(this.post.id, { text: text });
            comment.id = createdComment.id;
            comment.date = createdComment.date;
        } catch (error) {
            const failedCommentIndex = this.post.comments.findIndex(p => !p.id);
            this.post.comments.splice(failedCommentIndex, 1);
        } finally {
            this.post.isLoading = false;
        }
    }

    private async like() {
        try {
            if (this.post.userHasLiked) {
                this.post.likesCount--;
                this.post.userHasLiked = !this.post.userHasLiked;
                await this.postService.removePostLike(this.post.id);
            } else {
                this.post.likesCount++;
                this.post.userHasLiked = !this.post.userHasLiked;
                await this.postService.likePost(this.post.id);
            }
        } catch (error) {
            if (this.post.userHasLiked) {
                this.post.likesCount--;
            } else {
                this.post.likesCount++;
            }
            this.post.userHasLiked = !this.post.userHasLiked;
        } finally { }
    }

    private async getPost(postId: number) {
        try {
            this.progressService.start();
            this.post = await this.postService.getPostById(postId);
            this.post.activeAttachment = 0;
        } catch (error) { } finally {
            this.progressService.done();
        }
    }

    ngOnInit(): void {
        if (!this.post) {
            this.route.params.subscribe(async params => {
                const postId = params['postId'];

                this.getPost(postId);
            });
        }
    }
}
