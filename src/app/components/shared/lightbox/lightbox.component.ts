import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-lightbox',
    templateUrl: './lightbox.component.html',
    styleUrls: ['./lightbox.component.css']
})
export class LightboxComponent {
    private _pictureUri: string;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this._pictureUri = data.uri;
    }

    public get pictureUri(): string {
        return this._pictureUri;
    }
}
