import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MediaService } from 'app/services';
import { Page, MediaViewModel } from 'app/models/view';

@Injectable()
export class RecentMediaResolver implements Resolve<Page<MediaViewModel>> {
    constructor(
        private mediaService: MediaService) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Page<MediaViewModel>> {
        return this.mediaService.getRecentMedia(null)
            .pipe(catchError(error => {
                return of(error);
            }));
    }
}
