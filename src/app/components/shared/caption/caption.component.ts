import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-caption',
    templateUrl: './caption.component.html',
    styleUrls: ['./caption.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class CaptionComponent {
    @Input() public caption: string;
    public truncateWidth: number;

    public get defaultTruncateWidth(): number {
        return 60;
    }

    constructor() {
        this.truncateWidth = this.defaultTruncateWidth;
    }

    public increaseTruncateSize() {
        this.truncateWidth = 10000;
    }

    public fuck() {
        console.log('fuck');
    }
}
