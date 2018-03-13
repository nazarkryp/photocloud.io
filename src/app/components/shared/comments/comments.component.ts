import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { trigger, animate, style, transition, animateChild, group, query, stagger } from '@angular/animations';
import { Router } from '@angular/router';

import { CommentService } from 'app/services';
import { CurrentUserService } from 'app/infrastructure/services';
import { MediaViewModel, CurrentUserViewModel, CommentViewModel, PageViewModel, PaginationViewModel } from 'app/models/view';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.css'],
    animations: [
        trigger('commentsAnimation', [
            transition('* => *', [
                query('.comment', style({ transform: 'translateX(-50%)' })),
                query('.comment',
                    stagger('100ms', [
                        animate('250ms', style({ transform: 'translateX(0)' }))
                    ]))
            ])
        ])
    ]
})
export class CommentsComponent implements OnInit {
    @Input() public media: MediaViewModel;
    public isLoading: boolean;

    private currentUser: CurrentUserViewModel;
    public page: PageViewModel<CommentViewModel>;

    constructor(
        private currentUserService: CurrentUserService,
        private commentService: CommentService,
        private router: Router) {
        this.currentUser = this.currentUserService.retrieveCurrentUser();
    }

    public getComments() {
        if (this.isLoading) {
            return;
        }

        this.isLoading = true;

        this.commentService.getComments(this.media.id, this.page.pagination)
            .finally(() => {
                this.isLoading = false;
            })
            .subscribe(page => {
                this.page.hasMoreItems = page.hasMoreItems;
                this.page.pagination = page.pagination;
                if (page.data) {
                    this.page.data = this.page.data.concat(page.data);
                }
            });
    }

    public createComment(comment: CommentViewModel) {
        this.page.data.unshift(comment);
    }

    public removeComment(comment: CommentViewModel) {
        if (comment.id) {
            const indexToRemove = this.page.data.findIndex(e => e.id === comment.id);
            this.page.data.splice(indexToRemove, 1);
            this.media.commentsCount--;
            this.commentService.removeComment(this.media.id, comment.id)
                .subscribe(() => { }, () => {
                    this.media.commentsCount++;
                });
        } else {
            const indexToRemove = this.page.data.findIndex(e => !e.id);
            this.page.data.splice(indexToRemove, 1);
            this.media.commentsCount--;
        }
    }

    public ngOnInit(): void {
        this.page = new PageViewModel<CommentViewModel>();

        if (this.page.data) {
            this.page.hasMoreItems = this.media.comments.length < this.media.commentsCount;
        }

        if (this.page.hasMoreItems) {
            this.page.pagination = new PaginationViewModel();
            this.page.pagination.next = this.media.comments[this.media.comments.length - 1].id;

            this.media.comments.splice(this.media.comments.length - 1, 1);
        }

        this.page.data = this.media.comments;
    }
}
