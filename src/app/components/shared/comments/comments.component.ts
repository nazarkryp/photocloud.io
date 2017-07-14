import { Component, OnInit } from '@angular/core';
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
    private post: Post;
    private isLoading: Boolean;

    constructor(
        private commentService: CommentService,
        private router: Router) { }

    async getComments() {
        this.isLoading = true;
        try {
            this.post.comments = await this.commentService.getComments(this.post.id);
        } catch (error) {
        } finally {
            this.isLoading = false;
        }
    }

    async createComment() {
        this.isLoading = true;
        try {
            this.post.comments = await this.commentService.getComments(this.post.id);
        } catch (error) {
        } finally {
            this.isLoading = false;
        }
    }

    ngOnInit() {
    }
}
