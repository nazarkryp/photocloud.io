import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { MediaService } from 'app/services';
import { Page, Media } from 'app/common/models';

import { NgProgress } from 'ngx-progressbar';

@Injectable()
export class MediaResolver implements Resolve<Page<Media>> {
    constructor(
        private mediaService: MediaService,
        private progress: NgProgress) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : Page<Media> | Observable<Page<Media>> | Promise<Page<Media>> {
        this.progress.start();
        return this.mediaService.getPosts(null)
            .catch(error => {
                return Observable.of(error);
            });
    }
}
