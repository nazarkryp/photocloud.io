import { Component, Inject, ViewEncapsulation, Optional, OnInit } from '@angular/core';

import { MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { Post } from '../../../common/models/post';
import { User } from '../../../common/models/user';
import { Attachment } from '../../../common/models/attachment';

import { PostService } from '../../../services';

import { NgProgressService } from 'ngx-progressbar';

@Component({
    selector: 'app-post-details',
    templateUrl: './post-details.component.html',
    styleUrls: ['./post-details.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class PostDetailsComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private postService: PostService,
        private progressService: NgProgressService,
        @Optional() public dialogRef: MdDialogRef<PostDetailsComponent>,
        @Optional() @Inject(MD_DIALOG_DATA) public post: Post) {
        if (post) {
            this.post.activeAttachment = 0;
        }
    }

    next(): void {
        if (this.post.activeAttachment < this.post.attachments.length - 1) {
            this.post.activeAttachment++;
        }
    }

    previous(): void {
        if (this.post.activeAttachment > 0) {
            this.post.activeAttachment--;
        }
    }

    ngOnInit(): void {
        this.route.params.subscribe(async params => {
            const postId = params['postId'];

            this.getPost(postId);
        });
    }

    private async getPost(postId: number) {
        try {
            this.progressService.start();
            this.post = await this.postService.getPostById(postId);
            this.post.activeAttachment = 0;
        } catch (error) { } finally {
            this.progressService.done();
        }
    }
}
