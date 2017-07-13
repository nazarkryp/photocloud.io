import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { AccountService } from '../../services/account.service';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';

import { CurrentUser } from '../../common/models/current-user';
import { Post } from '../../common/models/post';
import { Attachment } from '../../common/models/attachment';
import { User } from '../../common/models/user';
import { CollectionModel } from '../../common/models/collection-model';

@Component({
    selector: 'app-user-posts',
    templateUrl: './user-posts.component.html',
    styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    private currentUser: CurrentUser;
    private page: CollectionModel<Post>;
    private isLoading = false;
    private isLoadingPosts: Boolean;
    private user: User = new User();

    constructor(
        private accountService: AccountService,
        private postService: PostService,
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute) {
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

    async getPosts(): Promise<CollectionModel<Post>> {
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

    async ngOnInit() {
        this.currentUser = this.accountService.getCurrentUser();

        this.subscription = this.route.params.subscribe(async params => {
            this.initializePage();
            this.user.username = params['username'];
            this.isLoading = true;
            const user = await this.getUser();

            if (!user) {
                return;
            } else if (!user.isActive) {
                console.log(`${user.username} is not active`);
            } else if (user.isPrivate && user.outgoingStatus !== 'following') {
                console.log(`${user.username} is private`);
            } else {
                await this.getPosts();
            }

            this.isLoading = false;
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private initializePage(): void {
        this.page = new CollectionModel<Post>();
        this.page.hasMoreItems = false;
        this.page.pagination = null;
        this.page.data = [];
    }
}
