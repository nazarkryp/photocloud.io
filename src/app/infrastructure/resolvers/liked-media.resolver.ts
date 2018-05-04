import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MediaService } from 'app/services';
import { Page, MediaViewModel } from 'app/models/view';

import { CurrentUserService } from 'app/infrastructure/services';

@Injectable()
export class LikedMediaResolver implements Resolve<Page<MediaViewModel>> {
    constructor(
        private location: Location,
        private currentUserService: CurrentUserService,
        private mediaService: MediaService) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Page<MediaViewModel>> {
        const currentUser = this.currentUserService.retrieveCurrentUser();
        this.location.replaceState(`${currentUser.username}/liked`);

        return this.mediaService.getLikedMedia(null)
            .pipe(catchError(error => {
                return of(error);
            }));
    }
}
