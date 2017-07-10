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
    private page: CollectionModel = new CollectionModel();
    private isLoading = false;

    constructor(private postService: PostService) {
        this.page.data = new Array<Post>();
        this.page.hasMoreItems = false;
    }

    getPosts() {
        this.isLoading = true;

        this.postService.getPosts(this.page.pagination)
            .then((response: CollectionModel) => {
                this.page.hasMoreItems = response.hasMoreItems;
                this.page.pagination = response.pagination;
                this.page.data = this.page.data.concat(response.data);
                this.isLoading = false;
            }, (error) => {
                this.isLoading = false;
            });
    }

    ngOnInit() {
        this.getPosts();
    }
}
