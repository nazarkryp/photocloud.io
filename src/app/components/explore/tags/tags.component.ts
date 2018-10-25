import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CurrentUserService } from 'app/infrastructure/services';
import { Page, MediaViewModel, CurrentUserViewModel } from 'app/models/view';
import { MediaService } from 'app/services';
import { ProgressService } from 'app/shared/services';
import { LikeService } from 'app/shared/services';
import { MediaViewService } from 'app/components/media-view/services/media-view.service';

@Component({
    templateUrl: './tags.component.html',
    styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit, OnDestroy {
    private routeSubscription: Subscription;
    private currentUserSubscription: Subscription;

    public page: Page<MediaViewModel> = new Page<MediaViewModel>();
    public currentUser: CurrentUserViewModel;
    public tag: string;
    public isLoading: boolean;

    constructor(
        private route: ActivatedRoute,
        private mediaViewService: MediaViewService,
        private mediaService: MediaService,
        private currentUserService: CurrentUserService,
        private likeService: LikeService,
        private progress: ProgressService) {
        this.currentUserSubscription = this.currentUserService.getCurrentUser()
            .subscribe(currentUser => {
                this.currentUser = currentUser;
            });
    }

    public getMedia(showProgress: boolean = true) {
        if (showProgress) {
            this.progress.start();
        }

        this.isLoading = true;
        this.mediaService.getMediaByTag(this.tag, this.page.pagination)
            .pipe(finalize(() => {
                this.isLoading = false;
                this.progress.complete();
            }))
            .subscribe(page => {
                this.page.hasMoreItems = page.hasMoreItems;
                this.page.pagination = page.pagination;
                if (page.data) {
                    this.page.data = this.page.data.concat(page.data);
                }
            });
    }

    public like(media) {
        this.likeService.like(media).subscribe(() => { });
    }

    public openPostDialog(media: MediaViewModel) {
        this.mediaViewService.open(media);
    }

    public onPositionChange() {
        if (!this.isLoading && this.page && this.page.hasMoreItems) {
            this.getMedia(false);
        }
    }

    public ngOnInit() {
        this.routeSubscription = this.route.params.subscribe(async params => {
            this.tag = params['tag'] as string;
            this.getMedia();
        });
    }

    public ngOnDestroy(): void {
        this.routeSubscription.unsubscribe();
        this.currentUserSubscription.unsubscribe();
    }
}
