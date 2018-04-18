import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AccountService } from 'app/account/services';
import { CurrentUserService } from 'app/infrastructure/services';
import { MediaService, UserService } from 'app/services';
import { CurrentUserViewModel, MediaViewModel, AttachmentViewModel, UserViewModel, Page, ErrorViewModel, UserMediaViewModel } from 'app/models/view';
import { RelationshipStatus, ValidationResult, } from 'app/models/shared'
import { MediaDetailsComponent } from 'app/components/shared/media-details/media-details.component';
import { UsersDialogComponent } from '../shared/users-dialog/users-dialog.component';
import { NgProgress } from 'ngx-progressbar';
import { ConfirmComponent } from 'app/components/shared/confirm/confirm.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    templateUrl: './user-media.component.html',
    styleUrls: ['./user-media.component.css']
})
export class UserMediaComponent implements OnInit, OnDestroy {
    private routeSubscription: Subscription;

    public userMedia: UserMediaViewModel;
    public currentUser: CurrentUserViewModel;

    public canEditRelationship: boolean;
    public isModifyingRelationship = false;

    public isLoading: boolean;

    constructor(
        private viewContainerRef: ViewContainerRef,
        private accountService: AccountService,
        private mediaService: MediaService,
        private userService: UserService,
        private currentUserService: CurrentUserService,
        private router: Router,
        private route: ActivatedRoute,
        public dialog: MatDialog,
        private progress: NgProgress) {
        this.currentUser = this.currentUserService.retrieveCurrentUser();
    }

    public getMedia(showProgress: boolean = true) {
        this.isLoading = true;

        if (showProgress && !this.progress.isStarted()) {
            this.progress.start();
        }

        this.mediaService.getUserMedia(this.userMedia.user.username, this.userMedia.page.pagination)
            .finally(() => {
                if (this.progress.isStarted()) {
                    this.progress.done();
                }

                this.isLoading = false;
            })
            .subscribe((page: Page<MediaViewModel>) => {
                this.userMedia.page.hasMoreItems = page.hasMoreItems;
                this.userMedia.page.pagination = page.pagination;

                if (page.data) {
                    this.userMedia.page.data = this.userMedia.page.data.concat(page.data);
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

    public getLink(event) {
        console.log(event);
    }

    public openPostDialog(event, media: MediaViewModel) {
        const dialog = this.dialog.open(MediaDetailsComponent, {
            viewContainerRef: this.viewContainerRef,
            data: media
        }).afterClosed().subscribe(remove => {
            media.editing = false;
            media.inspectingLikes = false;

            if (remove) {
                const indexToRemove = this.userMedia.page.data.findIndex(e => e.id === media.id);
                this.userMedia.page.data.splice(indexToRemove, 1);
                this.mediaService.removeMedia(media.id).subscribe();
            }
        });
    }

    public onPositionChange() {
        if (!this.isLoading && this.userMedia && this.userMedia.page && this.userMedia.page.hasMoreItems) {
            this.getMedia(false);
        }
    }

    public ngOnInit() {
        this.routeSubscription = this.route.paramMap.subscribe(params => {
            this.reset();
            this.userMedia = this.route.snapshot.data['userMedia'];
        });
    }

    public ngOnDestroy(): void {
        if (this.routeSubscription && !this.routeSubscription.closed) {
            this.routeSubscription.unsubscribe();
        }
    }

    private reset(): void {
        this.userMedia = new UserMediaViewModel();
        this.userMedia.page = new Page<MediaViewModel>();
        this.userMedia.page.hasMoreItems = false;
        this.userMedia.page.pagination = null;
        this.userMedia.page.data = [];
        this.userMedia.error = null;
    }
}
