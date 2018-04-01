import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/delay';

import { MediaViewModel, Page, CurrentUserViewModel } from 'app/models/view';
import { MediaDetailsComponent } from 'app/components/shared/media-details';
import { MediaService } from 'app/services';
import { CurrentUserService } from 'app/infrastructure/services';
import { AccountService } from 'app/account/services';
import { NgProgress } from 'ngx-progressbar';

@Component({
    templateUrl: './liked-media.component.html',
    styleUrls: ['./liked-media.component.css']
})
export class LikedMediaComponent implements OnInit, OnDestroy {
    private currentUserSubscription: Subscription;

    public page: Page<MediaViewModel> = new Page<MediaViewModel>();
    public currentUser: CurrentUserViewModel;

    constructor(
        private location: Location,
        public dialog: MatDialog,
        private route: ActivatedRoute,
        private mediaService: MediaService,
        private currentUserService: CurrentUserService,
        private accountService: AccountService,
        private progress: NgProgress) {
        this.currentUserSubscription = this.currentUserService.getCurrentUser().subscribe(currentUser => {
            this.currentUser = currentUser;
        })
    }

    public getLikedMedia() {
        this.progress.start();

        this.mediaService.getLikedMedia(this.page.pagination)
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

    public like(media) {
        if (media.userHasLiked) {
            media.likesCount--;
            media.userHasLiked = !media.userHasLiked;
            this.mediaService.removeMediaLike(media.id)
                .subscribe(() => {
                    media.userHasLiked = false;
                }, (error) => {
                    if (media.userHasLiked) {
                        media.likesCount--;
                    } else {
                        media.likesCount++;
                    }
                    media.userHasLiked = !media.userHasLiked;
                    return error;
                });
        } else {
            media.likesCount++;
            media.userHasLiked = !media.userHasLiked;
            this.mediaService.addMediaLike(media.id)
                .subscribe(() => {
                    media.userHasLiked = true;
                }, (error) => {
                    if (media.userHasLiked) {
                        media.likesCount--;
                    } else {
                        media.likesCount++;
                    }
                    media.userHasLiked = !media.userHasLiked;
                    return error;
                });
        }
    }

    public openPostDialog(media: MediaViewModel) {
        const dialogRef = this.dialog.open(MediaDetailsComponent, {
            data: media
        });
    }

    public ngOnInit() {
        this.page = this.route.snapshot.data['page'];
    }

    public ngOnDestroy(): void {
        if (this.currentUserSubscription && !this.currentUserSubscription.closed) {
            this.currentUserSubscription.unsubscribe();
        }
    }
}
