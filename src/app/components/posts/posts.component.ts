import { Component, OnInit } from '@angular/core';

import { PostService } from '../../services/post.service';

import { Post } from '../../common/models/post';
import { Attachment } from '../../common/models/attachment';
import { User } from '../../common/models/user';
import { CollectionModel } from '../../common/models/collection-model';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
    private page: CollectionModel<Post> = new CollectionModel<Post>();
    private isLoading = false;

    constructor(private postService: PostService) {
        this.page.data = new Array<Post>();
        this.page.hasMoreItems = false;
    }

    async getPosts() {
        this.isLoading = true;

        try {
            const page = await this.postService.getPosts(this.page.pagination) as CollectionModel<Post>;

            this.page.hasMoreItems = page.hasMoreItems;
            this.page.pagination = page.pagination;
            this.page.data = this.page.data.concat(page.data);
        } catch (error) {

        } finally {
            this.isLoading = false;
        }
    }

    async ngOnInit() {
        await this.getPosts();
    }
}

