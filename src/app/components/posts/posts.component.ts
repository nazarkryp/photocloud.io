import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs/Rx';

import { Post, User, Collection, Comment, Attachment, CurrentUser } from '../../common/models';
import { UserProvider } from '../../infrastructure/providers';
import { PostService } from '../../services';
import { CreatePostComponent } from '../shared/create-post/create-post.component';
import { ConfirmComponent } from '../shared/confirm/confirm.component';
import { NgProgress } from 'ngx-progressbar';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {
    private page: Collection<Post> = new Collection<Post>();
    private isLoading = false;
    private currentUser: CurrentUser;
    private currentUserSubscription: Subscription;

    constructor(
        private postService: PostService,
        private userProvider: UserProvider,
        private progressService: NgProgress,
        private dialog: MatDialog) {
        this.page.data = new Array<Post>();
        this.page.hasMoreItems = false;
        this.currentUserSubscription = this.userProvider.getCurrentUserAsObservable()
            .subscribe(currentUser => {
                this.currentUser = currentUser;
            });
    }

    private createPost() {
        const dialogRef = this.dialog.open(CreatePostComponent);

        dialogRef.afterClosed()
            .subscribe(createdPost => {
                if (createdPost) {
                    createdPost.user.pictureUri = this.currentUser.pictureUri;
                    this.page.data.unshift(createdPost);
                }
            });
    }

    private getPosts() {
        this.isLoading = true;
        this.progressService.start();

        this.postService.getPosts(this.page.pagination)
            .finally(() => {
                this.progressService.done();
            })
            .subscribe(page => {
                this.page.hasMoreItems = page.hasMoreItems;
                this.page.pagination = page.pagination;
                if (page.data) {
                    this.page.data = this.page.data.concat(page.data);
                }
            }, (error) => { }, () => {
                this.isLoading = false;
            });
    }

    private onRemoved(post: Post) {
        const dialogRef = this.dialog.open(ConfirmComponent, {
            data: {
                title: 'DELETE POST',
                message: 'Are you sure you want you want to delete this post?'
            }
        });

        dialogRef.afterClosed().subscribe(confirmed => {
            if (confirmed) {
                const indexToRemove = this.page.data.findIndex(p => p.id === post.id);
                this.page.data.splice(indexToRemove, 1);
                this.postService.removePost(post.id)
                    .subscribe();
            }
        });
    }

    public ngOnInit() {
        this.getPosts();
    }

    public ngOnDestroy() {
        this.currentUserSubscription.unsubscribe();
    }
}

