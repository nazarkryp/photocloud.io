import { Component, OnInit, Input } from '@angular/core';

import { Post } from '../../common/models/post';
import { Attachment } from '../../common/models/attachment';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
    @Input()
    post: Post;

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

    ngOnInit() {
        this.post.activeAttachment = 0;
    }
}
