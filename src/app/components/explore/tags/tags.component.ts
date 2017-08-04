import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription, Observable } from 'rxjs/Rx';

import { Collection, Post, CurrentUser } from '../../../common/models';
import { PostService } from '../../../services';

@Component({
    selector: 'app-tags',
    templateUrl: './tags.component.html',
    styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
    private subscription: Subscription;
    private page: Collection<Post> = new Collection<Post>();

    constructor(
        private route: ActivatedRoute,
        private postService: PostService) {
    }

    private getPosts(tag: string) {
        this.postService.getPostsByTag(tag, this.page.pagination)
            // this.postService.getPosts(this.page.pagination)
            .subscribe(page => {
                this.page.hasMoreItems = page.hasMoreItems;
                this.page.pagination = page.pagination;
                if (page.data) {
                    this.page.data = this.page.data.concat(page.data);
                }
            });
    }

    public ngOnInit() {
        this.subscription = this.route.params.subscribe(async params => {
            const tag = params['tag'] as string;
            this.getPosts(tag);
        });
    }
}
