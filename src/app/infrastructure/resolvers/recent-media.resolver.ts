import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MediaService } from 'app/services';
import { Page, MediaViewModel } from 'app/models/view';

import { NgProgress } from 'ngx-progressbar';

@Injectable()
export class RecentMediaResolver implements Resolve<Page<MediaViewModel>> {
    constructor(
        private mediaService: MediaService,
        private progress: NgProgress) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Page<MediaViewModel>> {
        this.progress.start();

        return this.mediaService.getRecentMedia(null)
            .pipe(catchError(error => {
                return of(error);
            }));
    }
}
