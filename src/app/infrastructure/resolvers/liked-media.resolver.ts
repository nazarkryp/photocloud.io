import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { MediaService } from 'app/services';
import { Page, MediaViewModel } from 'app/models/view';

import { NgProgress } from 'ngx-progressbar';
import { CurrentUserService } from 'app/infrastructure/services';

@Injectable()
export class LikedMediaResolver implements Resolve<Page<MediaViewModel>> {
    constructor(
        private location: Location,
        private currentUserService: CurrentUserService,
        private mediaService: MediaService,
        private progress: NgProgress) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Page<MediaViewModel>> {
        this.progress.start();

        const currentUser = this.currentUserService.retrieveCurrentUser();
        this.location.replaceState(`${currentUser.username}/liked`);

        return this.mediaService.getLikedMedia(null)
            .catch(error => {
                return Observable.of(error);
            });
    }
}
