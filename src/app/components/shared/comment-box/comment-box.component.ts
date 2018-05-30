import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'app-comment-box',
    templateUrl: './comment-box.component.html',
    styleUrls: ['./comment-box.component.css']
})
export class CommentBoxComponent {
    @ViewChild('commentInput')
    private commentInput: ElementRef;

    @Output('submitted')
    public submitted: EventEmitter<string> = new EventEmitter<string>();

    public comment: string;

    public submit($event) {
        if (this.comment) {
            this.submitted.next(this.comment);
            this.comment = '';
        }
    }

    public focusCommentInput() {
        this.commentInput.nativeElement.focus();
    }
}
