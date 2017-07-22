import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { CommentService } from '../../../services/comment.service';

import { Post } from '../../../common/models/post';
import { Comment } from '../../../common/models/comment';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
    @Input()
    public post: Post;

    private isLoading: boolean;

    constructor(
        private commentService: CommentService,
        private router: Router) { }

    getComments() {
        this.post.isLoading = true;
        this.isLoading = true;

        this.commentService.getComments(this.post.id)
            .finally(() => {
                this.isLoading = false;
                this.post.isLoading = false;
            })
            .subscribe(comments => {
                this.post.comments = comments;
            });
    }
}
