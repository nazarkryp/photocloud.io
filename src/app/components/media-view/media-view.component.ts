import { Component, OnInit, Input, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { MediaViewModel } from 'app/models/view';

@Component({
    selector: 'app-media-view',
    templateUrl: './media-view.component.html',
    styleUrls: ['./media-view.component.css']
})
export class MediaViewComponent implements OnInit {
    @ViewChild('attachment')
    private attachment: ElementRef;
    @ViewChild('player')
    public player: any;

    constructor(
        private ref: MatDialogRef<MediaViewComponent>,
        @Inject(MAT_DIALOG_DATA) public media: MediaViewModel
    ) { }

    public next() {
        if (this.player && !this.player.nativeElement.paused) {
            this.player.nativeElement.pause();
        }

        if (this.media.activeAttachment < this.media.attachments.length - 1) {
            this.media.activeAttachment++;
        }
    }

    public previous() {
        if (this.player && !this.player.nativeElement.paused) {
            this.player.nativeElement.pause();
        }

        if (this.media.activeAttachment > 0) {
            this.media.activeAttachment--;
        }
    }

    public play() {
        if (!this.player || this.media.attachments[this.media.activeAttachment].type !== 1) {
            return;
        }

        if (this.player.nativeElement.paused) {
            this.player.nativeElement.play();
        } else {
            this.player.nativeElement.pause();
        }

        if (!this.player.nativeElement.ontimeupdate) {
            this.player.nativeElement.ontimeupdate = (event) => {
                const progress = (this.player.nativeElement.currentTime * 100) / this.player.nativeElement.duration;
                this.media.attachments[this.media.activeAttachment].progress = progress;
            };
        }
    }

    public ngOnInit() {
        // const image = this.attachment.nativeElement;

        // console.log(window.innerHeight);
        // image.onload = (event) => {
        //     console.log(`${image.clientWidth} ${image.clientHeight}`);
        // };
    }
}
