import { Injectable } from '@angular/core';

import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Post } from '../common/models/post';
import { Pagination } from '../common/models/pagination';
import { CollectionModel } from '../common/models/collection-model';

@Injectable()
export class PostService {

    constructor(private http: Http) { }

    getPosts(pagination: Pagination) {
        let requestUri = 'https://krypapp.azurewebsites.net/posts/nazarkryp';

        if (pagination != null && pagination.next != null) {
            requestUri = requestUri + '?next=' + pagination.next;
        }

        return this.http.get(requestUri)
            .toPromise()
            .then(response => response.json() as CollectionModel)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }

}
