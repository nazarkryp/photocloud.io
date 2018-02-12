import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { MediaViewModel, UserViewModel, PageViewModel, CommentViewModel, AttachmentViewModel, CurrentUserViewModel } from 'app/models/view';
import { CurrentUserService } from 'app/infrastructure/services';
import { MediaService } from 'app/services';
import { CreateMediaComponent } from 'app/components/shared/create-media/create-media.component';
import { ConfirmComponent } from 'app/components/shared/confirm/confirm.component';
import { NgProgress } from 'ngx-progressbar';

@Component({
    selector: 'app-posts',
    templateUrl: './media.component.html',
    styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit, OnDestroy {
    private currentUserSubscription: Subscription;
    public page: PageViewModel<MediaViewModel> = new PageViewModel<MediaViewModel>();
    public isLoading = false;
    public currentUser: CurrentUserViewModel;

    constructor(
        private activatedRoute: ActivatedRoute,
        private mediaService: MediaService,
        private currentUserService: CurrentUserService,
        private progress: NgProgress,
        private dialog: MatDialog) {
        this.page.data = new Array<MediaViewModel>();
        this.page.hasMoreItems = false;
        this.currentUserSubscription = this.currentUserService.getCurrentUser()
            .subscribe(currentUser => {
                this.currentUser = currentUser;
            });
    }

    public createPost() {
        const dialogRef = this.dialog.open(CreateMediaComponent);

        dialogRef.afterClosed()
            .subscribe(createdPost => {
                if (createdPost) {
                    createdPost.user.pictureUri = this.currentUser.pictureUri;
                    if (!this.page.data) {
                        this.page.data = new Array<MediaViewModel>();
                    }

                    this.page.data.unshift(createdPost);
                }
            });
    }

    public getMedia() {
        this.isLoading = true;
        this.progress.start();

        this.mediaService.getRecentMedia(this.page.pagination)
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

    public onRemoved(media: MediaViewModel) {
        const dialogRef = this.dialog.open(ConfirmComponent, {
            data: {
                title: 'DELETE POST',
                message: 'Are you sure you want you want to delete this media?'
            }
        });

        dialogRef.afterClosed().subscribe(confirmed => {
            if (confirmed) {
                const indexToRemove = this.page.data.findIndex(p => p.id === media.id);
                this.page.data.splice(indexToRemove, 1);
                this.mediaService.removeMedia(media.id)
                    .subscribe();
            }
        });
    }

    public ngOnInit() {
        this.page = this.activatedRoute.snapshot.data['page'];
    }

    public ngOnDestroy() {
        this.currentUserSubscription.unsubscribe();
    }
}

