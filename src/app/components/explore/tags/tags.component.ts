import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Subscription, Observable } from 'rxjs/Rx';

import { UserProvider } from '../../../infrastructure/providers';
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
    private currentUserSubscription: Subscription;
    private tag: string;

    constructor(
        public dialog: MatDialog,
        private route: ActivatedRoute,
        private postService: PostService,
        private userProvider: UserProvider,
        private accountService: AccountService,
        private progressService: NgProgressService) {
        this.currentUserSubscription = this.userProvider.getCurrentUserAsObservable()
            .subscribe(currentUser => {
                this.currentUser = currentUser;
            });
    }

    private getPosts() {
        this.progressService.start();
        this.postService.getPostsByTag(this.tag, this.page.pagination)
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
            this.tag = params['tag'] as string;
            this.getPosts();
        });
    }

    public ngOnDestroy(): void {
        this.routeSubscription.unsubscribe();
        this.currentUserSubscription.unsubscribe();
    }
}
