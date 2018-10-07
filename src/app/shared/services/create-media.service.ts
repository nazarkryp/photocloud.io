import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { MediaService } from 'app/services';
import { CreateMediaComponent } from 'app/components/shared/create-media';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CreateMediaService {
    constructor(
        private readonly dialog: MatDialog,
        private readonly mediaService: MediaService) { }

    public open(): Observable<any> {
        return this.dialog.open(CreateMediaComponent, {
            disableClose: false,
            width: '500px',
            maxHeight: '100vh',
            maxWidth: '100vw',
            panelClass: 'dialog-container',
            backdropClass: 'dialog-backdrop'
        }).afterClosed();
    }
}
