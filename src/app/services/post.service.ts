import { Injectable } from '@angular/core';

import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Post } from '../common/models/post';
import { CollectionModel } from '../common/models/collection-model';

@Injectable()
export class PostService {

    constructor(private http: Http) { }

    getPosts() {
        return this.http.get('http://krypapp.azurewebsites.net/posts/nazarkryp')
            .toPromise()
            .then(response => response.json() as CollectionModel)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }

}
