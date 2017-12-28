import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { MediaService } from 'app/services';
import { PageViewModel, MediaViewModel } from 'app/models/view';

import { NgProgress } from 'ngx-progressbar';

@Injectable()
export class RecentMediaResolver implements Resolve<PageViewModel<MediaViewModel>> {
    constructor(
        private mediaService: MediaService,
        private progress: NgProgress) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : PageViewModel<MediaViewModel> | Observable<PageViewModel<MediaViewModel>> | Promise<PageViewModel<MediaViewModel>> {
        this.progress.start();
        return this.mediaService.getRecentMedia(null)
            .catch(error => {
                return Observable.of(error);
            });
    }
}
