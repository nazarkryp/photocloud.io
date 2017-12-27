import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AccountService } from 'app/account/services';
import { CurrentUserService } from 'app/infrastructure/services';
import { MediaService, UserService } from '../../services';
import { CurrentUserViewModel, MediaViewModel, AttachmentViewModel, UserViewModel, PageViewModel } from 'app/models/view';
import { Error, RelationshipStatus, ValidationResult, } from 'app/models/shared'
import { MediaDetailsComponent } from 'app/components/shared/media-details/media-details.component';
import { UsersComponent } from '../shared/users/users.component';
import { NgProgress } from 'ngx-progressbar';

@Component({
    selector: 'app-user-media',
    templateUrl: './user-media.component.html',
    styleUrls: ['./user-media.component.css']
})
export class UserMediaComponent implements OnInit, OnDestroy {
    public postSubscription: Subscription;
    public routeSubscription$: Subscription;
    private currentUserSubscription$: Subscription;
    public currentUser: CurrentUserViewModel;
    public page: PageViewModel<MediaViewModel>;
    public isModifyingRelationship = false;
    public isLoadingPosts: boolean;
    public user: UserViewModel = new UserViewModel();
    public error: Error;
    public canEditRelationship: boolean;

    constructor(
        private accountService: AccountService,
        private mediaService: MediaService,
        private userService: UserService,
        private currentUserService: CurrentUserService,
        private router: Router,
        private route: ActivatedRoute,
        public dialog: MatDialog,
        private progress: NgProgress) {
        this.currentUserSubscription$ = this.currentUserService.getCurrentUser()
            .subscribe(currentUser => {
                this.currentUser = currentUser;
            });
    }

    public getPosts() {
        this.isLoadingPosts = true;
        if (!this.progress.isStarted()) {
            this.progress.start();
        }

        this.postSubscription = this.mediaService.getUserMedia(this.user.username, this.page.pagination)
            .finally(() => {
                if (this.progress.isStarted()) {
                    this.progress.done();
                }

                this.isLoadingPosts = false;
            })
            .subscribe((page: PageViewModel<MediaViewModel>) => {
                this.page.hasMoreItems = page.hasMoreItems;
                this.page.pagination = page.pagination;

                if (page.data) {
                    this.page.data = this.page.data.concat(page.data);
                }
            });
    }

    public openPostDialog(media: MediaViewModel) {
        const dialog = this.dialog.open(MediaDetailsComponent, {
            data: media
        });

        dialog.afterClosed().subscribe(() => {
            media.editing = false;
        });
    }

    public initializePage(): void {
        this.page = new PageViewModel<MediaViewModel>();
        this.page.hasMoreItems = false;
        this.page.pagination = null;
        this.page.data = [];
        this.error = null;
    }

    public validateUser(user: UserViewModel): ValidationResult {
        const validationResult: ValidationResult = new ValidationResult();

        if (!user.isActive) {
            validationResult.hasErrors = true;
            validationResult.error = new Error('Account is not active');
        } else if (user.isPrivate
            && (!this.currentUser || user.id !== this.currentUser.id)
            && user.incommingStatus !== RelationshipStatus.Following) {
            validationResult.hasErrors = true;
            validationResult.error = new Error('Account is private');
            validationResult.error.description = this.currentUser
                ? `Follow ${user.username} to see all their photos` :
                `Already know ${user.username}? Sign in to see all their photos`;
        }

        return validationResult;
    }

    public ngOnInit() {
        this.routeSubscription$ = this.route.paramMap.subscribe(params => {
            this.initializePage();
            this.user = this.route.snapshot.data['user'];

            const result = this.validateUser(this.user);
            if (result.hasErrors) {
                this.progress.done();
                this.error = result.error;
            } else {
                this.getPosts();
            }
        });
    }

    public ngOnDestroy(): void {
        if (this.postSubscription && !this.postSubscription.closed) {
            this.postSubscription.unsubscribe();
        }

        this.currentUserSubscription$.unsubscribe();
        this.routeSubscription$.unsubscribe();
    }
}
