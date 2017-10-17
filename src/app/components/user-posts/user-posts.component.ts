import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Observable, Subscription } from 'rxjs/Rx';

import { UserProvider } from '../../infrastructure/providers';
import { AccountService, PostService, UserService } from '../../services';
import { CurrentUser, Post, Attachment, User, RelationshipStatus, Collection, ValidationResult, Error } from '../../common/models';
import { PostDetailsComponent } from '../shared/post-details/post-details.component';
import { UsersComponent } from '../shared/users/users.component';
import { NgProgressService } from 'ngx-progressbar';
import { UploaderService } from '../../services';
import { FileUploader } from 'ng2-file-upload';

@Component({
    selector: 'app-user-posts',
    templateUrl: './user-posts.component.html',
    styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit, OnDestroy {
    private postSubscription$: Subscription;
    private routeSubscription$: Subscription;
    private currentUserSubscription$: Subscription;
    private currentUser: CurrentUser;
    private page: Collection<Post>;
    private isModifyingRelationship = false;
    private isLoadingPosts: boolean;
    private user: User = new User();
    private error: Error;
    private uploader: FileUploader;
    private canEditRelationship: boolean;

    constructor(
        private accountService: AccountService,
        private postService: PostService,
        private userService: UserService,
        private userProvider: UserProvider,
        private router: Router,
        private route: ActivatedRoute,
        public dialog: MatDialog,
        private progressService: NgProgressService,
        private uploaderService: UploaderService) {
        this.uploader = uploaderService.createUploader((attachment) => this.onSuccessUpload(attachment));
        this.currentUserSubscription$ = this.userProvider.getCurrentUserAsObservable()
            .subscribe(currentUser => {
                this.currentUser = currentUser;
            });
    }

    private onSuccessUpload(attachment: Attachment) {
        this.accountService.updateAccount({
            pictureId: attachment.id
        }).subscribe(user => {
            this.user.pictureUri = user.pictureUri
        });
    }

    private getPosts() {
        this.isLoadingPosts = true;
        if (!this.progressService.isStarted()) {
            this.progressService.start();
        }

        this.postSubscription$ = this.postService.getUserPosts(this.user.username, this.page.pagination)
            .finally(() => {
                if (this.progressService.isStarted()) {
                    this.progressService.done();
                }

                this.isLoadingPosts = false;
            })
            .subscribe((page: Collection<Post>) => {
                this.page.hasMoreItems = page.hasMoreItems;
                this.page.pagination = page.pagination;

                if (page.data) {
                    this.page.data = this.page.data.concat(page.data);
                }
            });
    }

    private logout() {
        this.accountService.signOut();
        this.router.navigateByUrl('/signin');
    }

    private openPostDialog(post: Post) {
        this.dialog.open(PostDetailsComponent, {
            data: post
        });
    }

    private getFollowers() {
        const usersObservable = this.userService.getFollowers(this.user.id);
        this.dialog.open(UsersComponent, {
            data: {
                usersObservable: usersObservable,
                title: 'Followers'
            }
        });
    }

    private getFollowings() {
        const usersObservable = this.userService.getFollowings(this.user.id);
        this.dialog.open(UsersComponent, {
            data: {
                usersObservable: usersObservable,
                title: 'Following'
            }
        });
    }

    private modifyRelationship() {
        const action = this.getRelationshipAction(this.user.incommingStatus);
        this.isModifyingRelationship = true;
        this.userService.modifyRelationship(this.user.id, {
            action: action
        }).finally(() => {
            this.isModifyingRelationship = false;
        }).subscribe((user: User) => {
            this.user = user;
        }, () => { });
    }

    private initializePage(): void {
        this.page = new Collection<Post>();
        this.page.hasMoreItems = false;
        this.page.pagination = null;
        this.page.data = [];
        this.error = null;
    }

    private validateUser(user: User): ValidationResult {
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

    private getRelationshipAction(incommingStatus: RelationshipStatus): number {
        if (incommingStatus === RelationshipStatus.Following) {
            return 1;
        } else if (incommingStatus === RelationshipStatus.Requested) {
            return 1;
        } else if (incommingStatus === RelationshipStatus.Blocked) {
            return 4;
        }

        return 0;
    }

    public ngOnInit() {
        this.routeSubscription$ = this.route.paramMap.subscribe(params => {
            this.initializePage();
            this.user = this.route.snapshot.data['user'];

            const result = this.validateUser(this.user);
            if (result.hasErrors) {
                this.progressService.done();
                this.error = result.error;
            } else {
                this.getPosts();
            }
        });
    }

    public ngOnDestroy(): void {
        if (this.postSubscription$ && !this.postSubscription$.closed) {
            this.postSubscription$.unsubscribe();
        }

        this.uploader.destroy();
        this.currentUserSubscription$.unsubscribe();
        this.routeSubscription$.unsubscribe();
    }
}
