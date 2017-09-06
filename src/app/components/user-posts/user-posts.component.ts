import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdDialog } from '@angular/material';
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
    private subscription: Subscription;
    private currentUser: CurrentUser;
    private currentUserSubscription: Subscription;
    private page: Collection<Post>;
    private isLoading = false;
    private isModifyingRelationship = false;
    private isLoadingPosts: boolean;
    private user: User = new User();
    private error: Error;
    private uploader: FileUploader;

    constructor(
        private accountService: AccountService,
        private postService: PostService,
        private userService: UserService,
        private userProvider: UserProvider,
        private router: Router,
        private route: ActivatedRoute,
        public dialog: MdDialog,
        private progressService: NgProgressService,
        private uploaderService: UploaderService) {
        this.uploader = uploaderService.createUploader((attachment) => this.onSuccessUpload(attachment));
        this.currentUserSubscription = this.userProvider.getCurrentUserAsObservable()
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

    private getUser(username: string): Observable<User> {
        return this.userService.getUser(username)
            .catch(error => {
                if (error.status === 404) {
                    this.router.navigateByUrl('/404', { skipLocationChange: true });
                }

                return Observable.of(error);
            });
    }

    private getPosts() {
        this.isLoadingPosts = true;
        if (!this.progressService.isStarted()) {
            this.progressService.start();
        }

        this.postService.getUserPosts(this.user.username, this.page.pagination)
            .finally(() => {
                if (this.progressService.isStarted()) {
                    this.progressService.done();
                }
                this.isLoadingPosts = false;
                this.isLoading = false;
            })
            .subscribe((collection: Collection<Post>) => {
                this.page.hasMoreItems = collection.hasMoreItems;
                this.page.pagination = collection.pagination;
                if (collection.data) {
                    this.page.data = this.page.data.concat(collection.data);
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

    private getUserFeed(username: string) {
        this.isLoading = true;
        this.progressService.start();

        this.getUser(username)
            .subscribe((user: User) => {
                const validationResult = this.validateUser(user);
                this.user = user;
                if (!validationResult.hasErrors) {
                    this.getPosts();
                    return;
                }

                this.isLoading = false;
                this.progressService.done();
                this.error = validationResult.error;
            }, () => {
                this.isLoading = false;
                this.progressService.done();
            });
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
        this.subscription = this.route.params.subscribe(async params => {
            this.initializePage();
            const username = params['username'] as string;
            this.getUserFeed(username);
        });
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.uploader.destroy();
        this.currentUserSubscription.unsubscribe();
    }
}
