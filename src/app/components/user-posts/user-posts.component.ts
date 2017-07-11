import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PostService } from '../../services/post.service';

import { Post } from '../../common/models/post';
import { Attachment } from '../../common/models/attachment';
import { User } from '../../common/models/user';
import { CollectionModel } from '../../common/models/collection-model';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {
  private page: CollectionModel<Post> = new CollectionModel<Post>();
  private isLoading = false;

  constructor(private postService: PostService, private route: ActivatedRoute) {
    this.page.data = new Array<Post>();
    this.page.hasMoreItems = false;
  }

  getPosts() {
    this.isLoading = true;

    const username = this.route.snapshot.params['username'];

    this.postService.getUserPosts(username, this.page.pagination)
      .then((response: CollectionModel<Post>) => {
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
