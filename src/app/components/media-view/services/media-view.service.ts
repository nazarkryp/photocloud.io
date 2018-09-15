import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { BreakpointObserver } from '@angular/cdk/layout';

import { MediaViewModel } from 'app/models/view';
import { MediaViewComponent } from 'app/components/media-view/media-view.component';

@Injectable({
    providedIn: 'root'
})
export class MediaViewService {
    constructor(
        private breakpointObserver: BreakpointObserver,
        private dialog: MatDialog) { }

    public open(media: MediaViewModel): MatDialogRef<MediaViewComponent, any> {
        const isMobile = this.breakpointObserver.isMatched('(max-width: 500px)');

        const config: MatDialogConfig<any> = {
            height: 'auto',
            width: 'auto',
            maxHeight: 'calc(100vh - 1.4rem)',
            maxWidth: 'calc(100vw - 1.4rem)',
            data: media,
            autoFocus: false,
            panelClass: 'media-view-dialog-container',
            backdropClass: 'dialog-backdrop',
            hasBackdrop: true
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
