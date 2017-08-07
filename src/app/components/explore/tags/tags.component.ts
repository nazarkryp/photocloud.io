import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdDialog } from '@angular/material';
import { Subscription, Observable } from 'rxjs/Rx';

import { PostDetailsComponent } from '../../shared/post-details/post-details.component';
import { Collection, Post, CurrentUser } from '../../../common/models';
import { PostService, AccountService } from '../../../services';

import { NgProgressService } from 'ngx-progressbar';

@Component({
    selector: 'app-tags',
    templateUrl: './tags.component.html',
    styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit, OnDestroy {
    private routeSubscription: Subscription;
    private page: Collection<Post> = new Collection<Post>();
    private currentUser: CurrentUser;

    constructor(
        public dialog: MdDialog,
        private route: ActivatedRoute,
        private postService: PostService,
        private accountService: AccountService,
        private progressService: NgProgressService) {
        this.currentUser = this.accountService.getCurrentUser();
    }

    private getPosts(tag: string) {
        this.progressService.start();
        // this.postService.getPostsByTag(tag, this.page.pagination)
        this.postService.getUserPosts('lanafeshchuk', this.page.pagination)
            .finally(() => {
                this.progressService.done();
            })
            .subscribe(page => {
                this.page.hasMoreItems = page.hasMoreItems;
                this.page.pagination = page.pagination;
                if (page.data) {
                    this.page.data = this.page.data.concat(page.data);
                }
            });
    }

    private like(post) {
        if (post.userHasLiked) {
            post.likesCount--;
            post.userHasLiked = !post.userHasLiked;
            this.postService.removePostLike(post.id)
                .subscribe(() => {
                    post.userHasLiked = false;
                }, (error) => {
                    if (post.userHasLiked) {
                        post.likesCount--;
                    } else {
                        post.likesCount++;
                    }
                    post.userHasLiked = !post.userHasLiked;
                    return error;
                });
        } else {
            post.likesCount++;
            post.userHasLiked = !post.userHasLiked;
            this.postService.likePost(post.id)
                .subscribe(() => {
                    post.userHasLiked = true;
                }, (error) => {
                    if (post.userHasLiked) {
                        post.likesCount--;
                    } else {
                        post.likesCount++;
                    }
                    post.userHasLiked = !post.userHasLiked;
                    return error;
                });
        }
    }

    private openPostDialog(post: Post) {
        const dialogRef = this.dialog.open(PostDetailsComponent, {
            data: post
        });
    }

    public ngOnInit() {
        this.routeSubscription = this.route.params.subscribe(async params => {
            const tag = params['tag'] as string;
            this.getPosts(tag);
        });
    }

    public ngOnDestroy(): void {
        this.routeSubscription.unsubscribe();
    }
}