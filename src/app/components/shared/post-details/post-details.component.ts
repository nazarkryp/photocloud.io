import { Component, Inject } from '@angular/core';

import { MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';

import { Post } from '../../../common/models/post';
import { User } from '../../../common/models/user';
import { Attachment } from '../../../common/models/attachment';

@Component({
    selector: 'app-post-details',
    templateUrl: './post-details.component.html',
    styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent {
    constructor(
        public dialogRef: MdDialogRef<PostDetailsComponent>,
        @Inject(MD_DIALOG_DATA) public post: Post) {
        this.post.activeAttachment = 0;
    }

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
}
