import { Component, OnInit, Input } from '@angular/core';
import { trigger, animate, style, transition, animateChild, group, query, stagger } from '@angular/animations';
import { Router } from '@angular/router';

import {
    TdBounceAnimation,
    TdFlashAnimation,
    TdHeadshakeAnimation,
    TdJelloAnimation,
    TdPulseAnimation,
    TdFadeInOutAnimation
} from '@covalent/core';

import { CommentService } from 'app/services';
import { CurrentUserService } from 'app/infrastructure/services';
import { MediaViewModel, CurrentUserViewModel, CommentViewModel, PageViewModel } from 'app/models/view';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.css'],
    animations: [
        TdFadeInOutAnimation(),
        TdBounceAnimation(),                    // using implicit anchor name 'tdBounce' in template
        TdFlashAnimation(),                     // using implicit anchor name 'tdFlash' in template
        TdHeadshakeAnimation(),                 // using implicit anchor name 'tdHeadshake' in template
        TdJelloAnimation(),                     // using implicit anchor name 'tdJello' in template
        TdPulseAnimation({ duration: 200 }),    // using implicit anchor name 'tdPulse' in template,
        trigger('enterTransition', [
            transition(':enter', [
                style({ transform: 'translateX(25px)', opacity: 0 }),
                animate('200ms cubic-bezier(0.35, 0, 0.25, 1)', style('*'))
            ])
        ])
    ]
})
export class CommentsComponent {
    @Input() public media: MediaViewModel;
    public isLoading: boolean;
    public pulseState = false;

    private currentUser: CurrentUserViewModel;
    private page: PageViewModel<CommentViewModel>;

    constructor(
        private currentUserService: CurrentUserService,
        private commentService: CommentService,
        private router: Router) {
        this.currentUser = this.currentUserService.retrieveCurrentUser();
    }

    public getComments() {
        this.pulseState = !this.pulseState;
        this.isLoading = true;

        this.commentService.getComments(this.media.id)
            .finally(() => {
                this.isLoading = false;
            })
            .subscribe(comments => {
                this.media.comments = comments;
            });
    }

    public removeComment(comment: CommentViewModel) {
        const indexToRemove = this.media.comments.findIndex(e => e.id === comment.id);
        this.media.comments.splice(indexToRemove, 1);
        this.media.commentsCount--;
        this.commentService.removeComment(this.media.id, comment.id)
            .subscribe(() => { }, () => {
                this.media.commentsCount++;
            });
    }
}
