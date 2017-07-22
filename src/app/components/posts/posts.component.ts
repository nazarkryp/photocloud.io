import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { NgProgressService } from 'ngx-progressbar';
import { Post, User, Collection, Comment, Attachment } from '../../common/models';
import { PostService } from '../../services';

import { CreatePostComponent } from '../../components/shared/create-post/create-post.component';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
    private page: Collection<Post> = new Collection<Post>();
    private isLoading = false;

    constructor(
        private postService: PostService,
        private progressService: NgProgressService,
        private dialog: MdDialog) {
        this.page.data = new Array<Post>();
        this.page.hasMoreItems = false;
    }

    createPost() {
        const dialogRef = this.dialog.open(CreatePostComponent);
    }

    getPosts() {
        this.progressService.start();

        this.postService.getPosts(this.page.pagination)
            .finally(() => {
                this.progressService.done();
            })
            .subscribe(page => {
                this.page.hasMoreItems = page.hasMoreItems;
                this.page.pagination = page.pagination;
                this.page.data = this.page.data.concat(page.data);
            });
    }

    onRemoved(post: Post) {
        const indexToRemove = this.page.data.findIndex(p => p.id === post.id);
        this.page.data.splice(indexToRemove, 1);
        this.postService.removePost(post.id);
    }

    ngOnInit() {
        this.getPosts();
    }
}

