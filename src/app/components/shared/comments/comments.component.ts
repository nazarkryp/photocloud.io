import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { CommentService } from 'app/services';

import { Media } from 'app/common/models/media';
import { Comment } from 'app/common/models/comment';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
    @Input() public media: Media;
    public isLoading: boolean;

    constructor(
        private commentService: CommentService,
        private router: Router) { }

    public getComments() {
        this.media.isLoading = true;
        this.isLoading = true;

        this.commentService.getComments(this.media.id)
            .finally(() => {
                this.isLoading = false;
                this.media.isLoading = false;
            })
            .subscribe(comments => {
                this.media.comments = comments;
            });
    }
}
