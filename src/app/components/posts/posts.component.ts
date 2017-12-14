import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { Media, User, Page, Comment, Attachment, CurrentUser } from '../../common/models';
import { CurrentUserService } from 'app/infrastructure/services';
import { MediaService } from 'app/services';
import { CreatePostComponent } from 'app/components/shared/create-media/create-media.component';
import { ConfirmComponent } from 'app/components/shared/confirm/confirm.component';
import { NgProgress } from 'ngx-progressbar';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {
    private currentUserSubscription: Subscription;
    public page: Page<Media> = new Page<Media>();
    public isLoading = false;
    public currentUser: CurrentUser;

    constructor(
        private activatedRoute: ActivatedRoute,
        private mediaService: MediaService,
        private currentUserService: CurrentUserService,
        private progress: NgProgress,
        private dialog: MatDialog) {
        this.page.data = new Array<Media>();
        this.page.hasMoreItems = false;
        this.currentUserSubscription = this.currentUserService.getCurrentUser()
            .subscribe(currentUser => {
                this.currentUser = currentUser;
            });
    }

    public createPost() {
        const dialogRef = this.dialog.open(CreatePostComponent);

        dialogRef.afterClosed()
            .subscribe(createdPost => {
                if (createdPost) {
                    createdPost.user.pictureUri = this.currentUser.pictureUri;
                    if (!this.page.data) {
                        this.page.data = new Array<Media>();
                    }

                    this.page.data.unshift(createdPost);
                }
            });
    }

    public getPosts() {
        this.isLoading = true;
        this.progress.start();

        this.mediaService.getPosts(this.page.pagination)
            .finally(() => {
                this.progress.done();
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

    public onRemoved(post: Media) {
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
                this.mediaService.removePost(post.id)
                    .subscribe();
            }
        });
    }

    public ngOnInit() {
        this.page = this.activatedRoute.snapshot.data['page'];
        this.progress.done();
    }

    public ngOnDestroy() {
        this.currentUserSubscription.unsubscribe();
    }
}

