import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { CommentService } from 'app/services';

import { MediaViewModel } from 'app/models/view';
import { CommentViewModel, } from 'app/models/view';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
    @Input() public media: MediaViewModel;
    public isLoading: boolean;

    constructor(
        private commentService: CommentService,
        private router: Router) { }

    public getComments() {
        this.isLoading = true;

        this.commentService.getComments(this.media.id)
            .finally(() => {
                this.isLoading = false;
            })
            .subscribe(comments => {
                this.media.comments = comments;
            });
    }
}
