import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { PostService } from 'app/services';
import { Collection, Post } from 'app/common/models';

import { NgProgress } from 'ngx-progressbar';

@Injectable()
export class PostsResolver implements Resolve<Collection<Post>> {
    constructor(
        private postService: PostService,
        private progressService: NgProgress) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : Collection<Post> | Observable<Collection<Post>> | Promise<Collection<Post>> {
        this.progressService.start();
        return this.postService.getPosts(null);
    }
}
