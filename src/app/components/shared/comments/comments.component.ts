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
export class CommentsComponent implements OnInit {
    @Input()
    public post: Post;

    private isLoading: boolean;

    constructor(
        private commentService: CommentService,
        private router: Router) { }

    async getComments() {
        this.post.isLoading = true;
        this.isLoading = true;

        try {
            this.post.comments = await this.commentService.getComments(this.post.id);
        } catch (error) {
        } finally {
            this.isLoading = false;
            this.post.isLoading = false;
        }
    }

    ngOnInit() {
    }
}
