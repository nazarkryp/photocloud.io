import { Component, OnInit, OnDestroy, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CurrentUserService } from 'app/infrastructure/services';
import { ProgressService } from 'app/shared/services';
import { MediaService, UserService } from 'app/services';
import { CurrentUserViewModel, MediaViewModel, UserViewModel, Page, ErrorViewModel, UserMediaViewModel } from 'app/models/view';
import { RelationshipStatus, ValidationResult, } from 'app/models/shared';

import { MediaViewService } from '../media-view/services/media-view.service';

@Component({
    templateUrl: './user-media.component.html',
    styleUrls: ['./user-media.component.css']
})
export class UserMediaComponent implements OnInit, OnDestroy, AfterViewChecked {
    private routeSubscription: Subscription;

    public userMedia: UserMediaViewModel;
    public currentUser: CurrentUserViewModel;
    public canEditRelationship: boolean;
    public isModifyingRelationship = false;
    public isLoading: boolean;
    public mediaType = 0;

    constructor(
        private cd: ChangeDetectorRef,
        private mediaService: MediaService,
        private userService: UserService,
        private currentUserService: CurrentUserService,
        private route: ActivatedRoute,
        private mediaViewService: MediaViewService,
        private progress: ProgressService) {
        this.currentUser = this.currentUserService.retrieveCurrentUser();
    }

    public getMedia(showProgress: boolean = true, mediaType: number = null) {
        this.isLoading = true;

        if (showProgress && !this.progress.isLoading) {
            this.progress.start();
        }

        if (mediaType !== null) {
            this.userMedia.media.pagination = null;
        }

        this.mediaService.getUserMedia(this.userMedia.user.username, this.userMedia.media.pagination, this.mediaType)
            .pipe(finalize(() => {
                this.isLoading = false;
                this.progress.complete();
            }))
            .subscribe(page => {
                this.userMedia.media.hasMoreItems = page.hasMoreItems;
                this.userMedia.media.pagination = page.pagination;

                if (page.data && mediaType === null) {
                    this.userMedia.media.data = this.userMedia.media.data.concat(page.data);
                } else if (page.data && mediaType !== null) {
                    this.userMedia.media.data = page.data;
                }
            }, (error: HttpErrorResponse) => {
                if (error.status) {
                    this.userService.getUser(this.userMedia.user.username)
                        .subscribe(user => {
                            const validationResult = this.validateUser(user);
                            this.userMedia.user = user;
                            this.userMedia.error = validationResult.error;
                        });
                }
            });
    }

    private validateUser(user: UserViewModel): ValidationResult {
        const validationResult: ValidationResult = new ValidationResult();
        const currentUser = this.currentUserService.retrieveCurrentUser();

        if (!user.isActive) {
            validationResult.hasErrors = true;
            validationResult.error = new ErrorViewModel('Account is not active');
        } else if (user.isPrivate
            && (!currentUser || user.id !== currentUser.id)
            && user.relationship.outgoingStatus !== RelationshipStatus.Following) {
            validationResult.hasErrors = true;
            validationResult.error = new ErrorViewModel('Account is private');
            validationResult.error.description = currentUser
                ? `Follow ${user.username} to see all their photos` :
                `Already know ${user.username}? Sign in to see all their photos`;
        }

        return validationResult;
    }

    public openPostDialog(media: MediaViewModel) {
        this.mediaViewService.open(media);
        // this.dialog.open(MediaViewComponent, {
        //     viewContainerRef: this.viewContainerRef,
        //     scrollStrategy: this.overlay.scrollStrategies.block(),
        //     height: 'auto',
        //     width: 'auto',
        //     maxHeight: 'calc(100vh - 1.4rem)',
        //     maxWidth: 'calc(100vw - 1.4rem)',
        //     data: media,
        //     autoFocus: false
        // }).afterClosed().subscribe(() => {
        //     media.editing = false;
        // });

        // const dialog = this.dialog.open(MediaDetailsComponent, {
        //     viewContainerRef: this.viewContainerRef,
        //     data: media
        // }).afterClosed().subscribe(remove => {
        //     media.editing = false;
        //     media.inspectingLikes = false;

        //     if (remove) {
        //         const indexToRemove = this.userMedia.page.data.findIndex(e => e.id === media.id);
        //         this.userMedia.page.data.splice(indexToRemove, 1);
        //         this.mediaService.removeMedia(media.id).subscribe();
        //     }
        // });
    }

    public onPositionChange() {
        if (!this.isLoading && this.userMedia && this.userMedia.media && this.userMedia.media.hasMoreItems) {
            this.getMedia(false);
        }
    }

    public applyFilter(mediaType: number) {
        this.mediaType = mediaType;
        this.getMedia(true, mediaType);
    }

    public ngOnInit() {
        this.routeSubscription = this.route.paramMap.subscribe(() => {
            this.reset();
            this.userMedia = this.route.snapshot.data['userMedia'];
        });
    }

    public ngAfterViewChecked(): void {
        this.cd.detectChanges();
    }

    public ngOnDestroy(): void {
        if (this.routeSubscription && !this.routeSubscription.closed) {
            this.routeSubscription.unsubscribe();
        }
    }

    private reset(): void {
        this.userMedia = new UserMediaViewModel();
        this.userMedia.media = new Page<MediaViewModel>();
        this.userMedia.media.hasMoreItems = false;
        this.userMedia.media.pagination = null;
        this.userMedia.media.data = [];
        this.userMedia.error = null;
    }
}
