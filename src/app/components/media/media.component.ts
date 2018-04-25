import { Component, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Subscription } from 'rxjs/Subscription';

import { MediaViewModel, UserViewModel, Page, CommentViewModel, AttachmentViewModel, CurrentUserViewModel } from 'app/models/view';
import { CurrentUserService } from 'app/infrastructure/services';
import { MediaService } from 'app/services';
import { CreateMediaComponent } from 'app/components/shared/create-media/create-media.component';
import { ConfirmComponent } from 'app/components/shared/confirm/confirm.component';

import { NgProgress } from 'ngx-progressbar';

@Component({
    templateUrl: './media.component.html',
    styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit, OnDestroy {
    private currentUserSubscription: Subscription;
    public page: Page<MediaViewModel> = new Page<MediaViewModel>();
    public isLoading = false;
    public currentUser: CurrentUserViewModel;

    public state = 'hide';

    constructor(
        public el: ElementRef,
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

    public createMedia() {
        const dialogRef = this.dialog.open(CreateMediaComponent, { disableClose: false });

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

    public getMedia(showProgress: boolean = true) {
        this.isLoading = true;

        if (showProgress) {
            this.progress.start();
        }

        this.mediaService.getRecentMedia(this.page.pagination)
            .finally(() => {
                this.isLoading = false;
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

    public onPositionChange() {
        if (!this.isLoading && this.page && this.page.hasMoreItems) {
            this.getMedia(false);
        }
    }

    public ngOnInit() {
        this.page = this.activatedRoute.snapshot.data['page'];
    }

    public ngOnDestroy() {
        this.currentUserSubscription.unsubscribe();
    }
}

