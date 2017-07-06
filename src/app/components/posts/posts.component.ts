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
    private page: CollectionModel;

    constructor(private postService: PostService) {
    }

    ngOnInit() {
        this.postService.getPosts()
            .then((response) => {
                this.page = response;
            });
    }
}
