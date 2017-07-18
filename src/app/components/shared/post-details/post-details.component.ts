import { Component, Inject, ViewEncapsulation, Optional, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';

import { Post, User, Attachment, Comment, CurrentUser } from '../../../common/models';
import { PostService, CommentService } from '../../../services';
import { NgProgressService } from 'ngx-progressbar';

@Component({
    selector: 'app-post-details',
    templateUrl: './post-details.component.html',
    styleUrls: ['./post-details.component.css'],
    encapsulation: ViewEncapsulation.None
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
        @Optional() public dialogRef: MdDialogRef<PostDetailsComponent>,
        @Optional() @Inject(MD_DIALOG_DATA) public post: Post,
        @Inject(DOCUMENT) private document: any) {
        if (post) {
            this.post.activeAttachment = 0;
            this.isDialog = true;
        }
    }

    next(): void {
        if (this.post.activeAttachment < this.post.attachments.length - 1) {
            this.post.activeAttachment++;
        }
    }

    previous(): void {
        if (this.post.activeAttachment > 0) {
            this.post.activeAttachment--;
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

    remove() {
        this.onRemoved.emit(this.post);
    }

    share() {
        const pathArray = this.document.location.href.split('/');
        const protocol = pathArray[0];
        const host = pathArray[2];

        return protocol + '//' + host + '/p/' + this.post.id;
    }

    async createComment() {
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

    async like() {
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
}
