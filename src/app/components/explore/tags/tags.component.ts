import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { CurrentUserService } from 'app/infrastructure/services';
import { MediaDetailsComponent } from 'app/components/shared/media-details/media-details.component';
import { Page, MediaViewModel, CurrentUserViewModel } from 'app/models/view';
import { MediaService } from 'app/services';
import { AccountService } from 'app/account/services';

import { NgProgress } from 'ngx-progressbar';
import { LikeService } from 'app/shared/services';

@Component({
    selector: 'app-tags',
    templateUrl: './tags.component.html',
    styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit, OnDestroy {
    private routeSubscription$: Subscription;
    private currentUserSubscription: Subscription;

    public page: Page<MediaViewModel> = new Page<MediaViewModel>();
    public currentUser: CurrentUserViewModel;
    public tag: string;
    public isLoading: boolean;

    constructor(
        public dialog: MatDialog,
        private route: ActivatedRoute,
        private mediaService: MediaService,
        private currentUserService: CurrentUserService,
        private accountService: AccountService,
        private likeService: LikeService,
        private progress: NgProgress) {
        this.currentUserSubscription = this.currentUserService.getCurrentUser()
            .subscribe(currentUser => {
                this.currentUser = currentUser;
            });
    }

    public getMedia() {
        this.progress.start();
        this.isLoading = true;
        this.mediaService.getMediaByTag(this.tag, this.page.pagination)
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
            });
    }

    public like(media) {
        this.likeService.like(media);
    }

    public openPostDialog(media: MediaViewModel) {
        const dialogRef = this.dialog.open(MediaDetailsComponent, {
            data: media
        });
    }

    public ngOnInit() {
        this.routeSubscription$ = this.route.params.subscribe(async params => {
            this.tag = params['tag'] as string;
            this.getMedia();
        });
    }

    public ngOnDestroy(): void {
        this.routeSubscription$.unsubscribe();
        this.currentUserSubscription.unsubscribe();
    }
}
