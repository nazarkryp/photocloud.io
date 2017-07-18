import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { MdDialog } from '@angular/material';

import { AccountService } from '../../services/account.service';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';

import { CurrentUser } from '../../common/models/current-user';
import { Post } from '../../common/models/post';
import { Attachment } from '../../common/models/attachment';
import { User } from '../../common/models/user';
import { RelationshipStatus } from '../../common/models/relationship-status';
import { Collection } from '../../common/models/collection-model';

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

    constructor(
        private accountService: AccountService,
        private postService: PostService,
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute,
        public dialog: MdDialog,
        private progressService: NgProgressService) {
    }

    async getUser(): Promise<User> {
        try {
            const user = await this.userService.getUser(this.user.username);
            this.user = user;

            return this.user;
        } catch (error) {
            if (error.status === 404) {
                this.router.navigateByUrl('/404', { skipLocationChange: true });
            }

            return null;
        } finally {
        }
    }

    async getPosts(): Promise<Collection<Post>> {
        this.isLoadingPosts = true;

        try {
            const page = await this.postService.getUserPosts(this.user.username, this.page.pagination);
            this.page.hasMoreItems = page.hasMoreItems;
            this.page.pagination = page.pagination;
            this.page.data = this.page.data.concat(page.data);

            return page;
        } catch (error) { } finally {
            this.isLoadingPosts = false;
        }
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

    async modifyRelationship() {
        this.isModifyingRelationship = true;
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
        try {
            this.user = await this.userService.modifyRelationship(this.user.id, {
                action: action
            });
        } catch (error) {
        } finally {
            this.isModifyingRelationship = false;
        }
    }

    async ngOnInit() {
        this.currentUser = this.accountService.getCurrentUser();

        this.subscription = this.route.params.subscribe(async params => {
            this.initializePage();
            this.user.username = params['username'];
            this.isLoading = true;
            this.progressService.start();
            const user = await this.getUser();

            if (!user) {
                return;
            } else if (!user.isActive) {
                console.log(`${user.username} is not active`);
            } else if (user.isPrivate && user.id !== this.currentUser.id && user.incommingStatus !== RelationshipStatus.Following) {
                console.log(`${user.username} is private`);
            } else {
                await this.getPosts();
            }

            this.isLoading = false;
            this.progressService.done();
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
