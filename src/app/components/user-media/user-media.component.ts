import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AccountService } from 'app/account/services';
import { CurrentUserService } from 'app/infrastructure/services';
import { MediaService, UserService } from 'app/services';
import { CurrentUserViewModel, MediaViewModel, AttachmentViewModel, UserViewModel, PageViewModel, ErrorViewModel, UserMediaViewModel } from 'app/models/view';
import { RelationshipStatus, ValidationResult, } from 'app/models/shared'
import { MediaDetailsComponent } from 'app/components/shared/media-details/media-details.component';
import { UsersComponent } from '../shared/users/users.component';
import { NgProgress } from 'ngx-progressbar';
import { ConfirmComponent } from 'app/components/shared/confirm/confirm.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-user-media',
    templateUrl: './user-media.component.html',
    styleUrls: ['./user-media.component.css']
})
export class UserMediaComponent implements OnInit, OnDestroy {
    private routeSubscription: Subscription;
    private currentUserSubscription: Subscription;

    public userMedia: UserMediaViewModel;
    public currentUser: CurrentUserViewModel;

    public canEditRelationship: boolean;
    public isModifyingRelationship = false;

    public isLoadingPosts: boolean;

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
        this.currentUserSubscription = this.currentUserService.getCurrentUser()
            .subscribe(currentUser => {
                this.currentUser = currentUser;
            });
    }

    public getMedia() {
        this.isLoadingPosts = true;

        if (!this.progress.isStarted()) {
            this.progress.start();
        }

        this.mediaService.getUserMedia(this.userMedia.user.username, this.userMedia.page.pagination)
            .finally(() => {
                if (this.progress.isStarted()) {
                    this.progress.done();
                }

                this.isLoadingPosts = false;
            })
            .subscribe((page: PageViewModel<MediaViewModel>) => {
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
            && user.incommingStatus !== RelationshipStatus.Following) {
            validationResult.hasErrors = true;
            validationResult.error = new ErrorViewModel('Account is private');
            validationResult.error.description = currentUser
                ? `Follow ${user.username} to see all their photos` :
                `Already know ${user.username}? Sign in to see all their photos`;
        }

        return validationResult;
    }

    public openPostDialog(media: MediaViewModel) {
        const dialog = this.dialog.open(MediaDetailsComponent, {
            viewContainerRef: this.viewContainerRef,
            data: media
        });

        dialog.afterClosed().subscribe(remove => {
            media.editing = false;
            media.inspectingLikes = false;

            if (remove) {
                const indexToRemove = this.userMedia.page.data.findIndex(e => e.id === media.id);
                this.userMedia.page.data.splice(indexToRemove, 1);
                this.mediaService.removeMedia(media.id).subscribe();
            }
        });
    }

    public ngOnInit() {
        this.routeSubscription = this.route.paramMap.subscribe(params => {
            this.initializePage();
            this.userMedia = this.route.snapshot.data['userMedia'];
        });
    }

    public ngOnDestroy(): void {
        if (this.currentUserSubscription && !this.currentUserSubscription.closed) {
            this.currentUserSubscription.unsubscribe();
        }

        if (this.routeSubscription && !this.routeSubscription.closed) {
            this.routeSubscription.unsubscribe();
        }
    }

    private initializePage(): void {
        this.userMedia = new UserMediaViewModel();
        this.userMedia.page = new PageViewModel<MediaViewModel>();
        this.userMedia.page.hasMoreItems = false;
        this.userMedia.page.pagination = null;
        this.userMedia.page.data = [];
        this.userMedia.error = null;
    }
}
