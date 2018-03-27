import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { MediaService } from 'app/services';
import { Page, MediaViewModel } from 'app/models/view';

import { NgProgress } from 'ngx-progressbar';

@Injectable()
export class RecentMediaResolver implements Resolve<Page<MediaViewModel>> {
    constructor(
        private mediaService: MediaService,
        private progress: NgProgress) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : Page<MediaViewModel> | Observable<Page<MediaViewModel>> | Promise<Page<MediaViewModel>> {
        this.progress.start();
        return this.mediaService.getRecentMedia(null)
            .catch(error => {
                return Observable.of(error);
            });
    }
}
