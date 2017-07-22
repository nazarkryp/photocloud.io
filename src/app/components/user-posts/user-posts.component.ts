import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { Observable, Subscription } from 'rxjs/Rx';

import { AccountService, PostService, UserService } from '../../services';
import { CurrentUser, Post, Attachment, User, RelationshipStatus, Collection, Error } from '../../common/models';
import { PostDetailsComponent } from '../shared/post-details/post-details.component';
import { NgProgressService } from 'ngx-progressbar';

@Component({
    selector: 'app-user-posts',
    templateUrl: './user-posts.component.html',
    styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    private currentUser: CurrentUser;
    private page: Collection<Post>;
    private isLoading = false;
    private isModifyingRelationship = false;
    private isLoadingPosts: boolean;
    private user: User = new User();
    private error: Error;

    constructor(
        private accountService: AccountService,
        private postService: PostService,
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute,
        public dialog: MdDialog,
        private progressService: NgProgressService) {
    }

    private getUser(): Observable<User> {
        return this.userService.getUser(this.user.username)
            .do(user => this.user = user, error => {
                if (error.status === 404) {
                    this.router.navigateByUrl('/404', { skipLocationChange: true });
                }
            });
    }

    private getPosts() {
        this.progressService.start();

        this.postService.getUserPosts(this.user.username, this.page.pagination)
            .subscribe(page => {
                this.page.hasMoreItems = page.hasMoreItems;
                this.page.pagination = page.pagination;
                this.page.data = this.page.data.concat(page.data);
            }, error => { }, () => {
                this.progressService.done();
            });
    }

    logout() {
        this.accountService.signOut();
        this.router.navigateByUrl('/signin');
    }

    openPostDialog(post: Post) {
        const dialogRef = this.dialog.open(PostDetailsComponent, {
            data: post
        });
    }

    modifyRelationship() {
        let action: number;

        if (this.user.incommingStatus === RelationshipStatus.None) {
            action = 0;
        } else if (this.user.incommingStatus === RelationshipStatus.Following) {
            action = 1;
        } else if (this.user.incommingStatus === RelationshipStatus.Requested) {
            action = 1;
        } else if (this.user.incommingStatus === RelationshipStatus.Blocked) {
            action = 4;
        }

        this.isModifyingRelationship = true;
        this.userService.modifyRelationship(this.user.id, {
            action: action
        }).subscribe(user => {
            this.user = user;
        }, error => { }, () => {
            this.isModifyingRelationship = false;
        });
    }

    ngOnInit() {
        this.currentUser = this.accountService.getCurrentUser();

        this.subscription = this.route.params.subscribe(async params => {
            this.initializePage();
            this.user.username = params['username'];

            this.isLoading = true;
            this.progressService.start();
            this.getUser()
                .subscribe(user => {
                    if (!user) {
                        return;
                    } else if (!user.isActive) {
                        this.error = new Error('Account is not active');
                    } else if (user.isPrivate
                        && (!this.currentUser
                            || user.id !== this.currentUser.id)
                        && user.incommingStatus !== RelationshipStatus.Following) {
                        if (this.currentUser) {
                            this.error = new Error('Account is private',
                                `Follow ${this.user.username} to see all their photos`);
                        } else {
                            this.error = new Error('Account is private',
                                `Already know ${this.user.username}? Sign in to see all their photos`);
                        }
                    } else {
                        this.getPosts();
                    }
                }, error => { }, () => {
                    this.isLoading = false;
                    this.progressService.done();
                })
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private initializePage(): void {
        this.page = new Collection<Post>();
        this.page.hasMoreItems = false;
        this.page.pagination = null;
        this.page.data = [];
    }
}
