import { Component, ViewEncapsulation, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { Post, Attachment, User, Comment, CurrentUser } from '../../common/models';
import { AccountService, CommentService, PostService } from '../../services';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class PostComponent implements OnInit {
    @Input() public post: Post;
    @Output() public onRemoved = new EventEmitter<Post>();

    private text: string;
    private shareLink: string;

    private currentUser: CurrentUser;

    constructor(
        private accountService: AccountService,
        private commentService: CommentService,
        private postService: PostService,
        public snackBar: MdSnackBar,
        @Inject(DOCUMENT) private document: any
    ) { }

    next() {
        if (this.post.activeAttachment < this.post.attachments.length - 1) {
            this.post.activeAttachment++;
        }
    }

    previous() {
        if (this.post.activeAttachment > 0) {
            this.post.activeAttachment--;
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

    showToast(message: string) {
        const config = new MdSnackBarConfig();
        config.duration = 1500;
        const result = this.snackBar.open(message, null, config);
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

    ngOnInit() {
        this.post.activeAttachment = 0;
        // tslint:disable-next-line:max-line-length
        // this.post.caption = this.post.caption.replace(/#(\w+)/g, '<a class="hashtag" href="https://www.google.com/?q=$1" target="_blank" style="color: #e91e63;text-decoration: none;font-weight: bold;">$&</a>');
        this.currentUser = this.accountService.getCurrentUser(false);
    }
}
