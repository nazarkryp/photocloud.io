import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-comment-box',
    templateUrl: './comment-box.component.html',
    styleUrls: ['./comment-box.component.css']
})
export class CommentBoxComponent {
    @Output('submitted')
    public submitted: EventEmitter<string> = new EventEmitter<string>();

    public comment: string;

    public submit($event) {
        if (this.comment) {
            this.submitted.next(this.comment);
            this.comment = '';
        }
    }
}
