import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Post, Attachment, User, Comment, CurrentUser } from '../../common/models';
import { AccountService, CommentService, PostService } from '../../services';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
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
        this.currentUser = this.accountService.getCurrentUser(false);
    }
}
