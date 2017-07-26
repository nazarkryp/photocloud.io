import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { NgProgressService } from 'ngx-progressbar';
import { Post, User, Collection, Comment, Attachment, CurrentUser } from '../../common/models';
import { AccountService, PostService } from '../../services';

import { CreatePostComponent } from '../../components/shared/create-post/create-post.component';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
    private page: Collection<Post> = new Collection<Post>();
    private isLoading = false;
    private currentUser: CurrentUser;

    constructor(
        private accountService: AccountService,
        private postService: PostService,
        private progressService: NgProgressService,
        private dialog: MdDialog) {
        this.page.data = new Array<Post>();
        this.page.hasMoreItems = false;
    }

    createPost() {
        const dialogRef = this.dialog.open(CreatePostComponent);

        dialogRef.afterClosed()
            .subscribe(createdPost => {
                if (createdPost) {
                    createdPost.user.pictureUri = this.currentUser.pictureUri;
                    this.page.data.unshift(createdPost);
                }
            });
    }

    getPosts() {
        this.isLoading = true;
        this.progressService.start();

        this.postService.getPosts(this.page.pagination)
            .finally(() => {
                this.progressService.done();
            })
            .subscribe(page => {
                this.page.hasMoreItems = page.hasMoreItems;
                this.page.pagination = page.pagination;
                this.page.data = this.page.data.concat(page.data);
            }, (error) => { }, () => {
                this.isLoading = false;
            });
    }

    onRemoved(post: Post) {
        const indexToRemove = this.page.data.findIndex(p => p.id === post.id);
        this.page.data.splice(indexToRemove, 1);
        this.postService.removePost(post.id)
            .subscribe();
    }

    ngOnInit() {
        this.currentUser = this.accountService.getCurrentUser(false);
        this.getPosts();
    }
}

