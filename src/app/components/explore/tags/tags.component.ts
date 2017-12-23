import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { CurrentUserService } from 'app/infrastructure/services';
import { MediaDetailsComponent } from 'app/components/shared/media-details/media-details.component';
import { PageViewModel, MediaViewModel, CurrentUserViewModel } from 'app/models/view';
import { MediaService } from 'app/services';
import { AccountService } from 'app/account/services';

import { NgProgress } from 'ngx-progressbar';

@Component({
    selector: 'app-tags',
    templateUrl: './tags.component.html',
    styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit, OnDestroy {
    private routeSubscription$: Subscription;
    private currentUserSubscription: Subscription;

    public page: PageViewModel<MediaViewModel> = new PageViewModel<MediaViewModel>();
    public currentUser: CurrentUserViewModel;
    public tag: string;

    constructor(
        public dialog: MatDialog,
        private route: ActivatedRoute,
        private mediaService: MediaService,
        private currentUserService: CurrentUserService,
        private accountService: AccountService,
        private progress: NgProgress) {
        this.currentUserSubscription = this.currentUserService.getCurrentUser()
            .subscribe(currentUser => {
                this.currentUser = currentUser;
            });
    }

    public getPosts() {
        this.progress.start();
        this.mediaService.getPostsByTag(this.tag, this.page.pagination)
            .finally(() => {
                this.progress.done();
            })
            .subscribe(page => {
                this.page.hasMoreItems = page.hasMoreItems;
                this.page.pagination = page.pagination;
                if (page.data) {
                    this.page.data = this.page.data.concat(page.data);
                }
            });
    }

    public like(post) {
        if (post.userHasLiked) {
            post.likesCount--;
            post.userHasLiked = !post.userHasLiked;
            this.mediaService.removePostLike(post.id)
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
            this.mediaService.likePost(post.id)
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

    public openPostDialog(post: MediaViewModel) {
        const dialogRef = this.dialog.open(MediaDetailsComponent, {
            data: post
        });
    }

    public ngOnInit() {
        this.routeSubscription$ = this.route.params.subscribe(async params => {
            this.tag = params['tag'] as string;
            this.getPosts();
        });
    }

    public ngOnDestroy(): void {
        this.routeSubscription$.unsubscribe();
        this.currentUserSubscription.unsubscribe();
    }
}
