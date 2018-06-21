import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { MediaViewModel } from 'app/models/view';
import { MediaViewComponent } from 'app/components/media-view/media-view.component';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MediaViewService {
    constructor(
        private breakpointObserver: BreakpointObserver,
        private dialog: MatDialog) { }

    public open(media: MediaViewModel): MatDialogRef<MediaViewComponent, any> {
        const isMobile = this.breakpointObserver.isMatched('(max-width: 500px)');

        const config = {
            height: 'auto',
            width: 'auto',
            maxHeight: 'calc(100vh - 1.4rem)',
            maxWidth: 'calc(100vw - 1.4rem)',
            data: media,
            autoFocus: false
        };

        if (isMobile) {
            config.width = '100vw';
            config.height = '100vh';
            config.maxHeight = '100vh';
            config.maxWidth = '100vw';
        }

        return this.dialog.open(MediaViewComponent, config);
    }
}
