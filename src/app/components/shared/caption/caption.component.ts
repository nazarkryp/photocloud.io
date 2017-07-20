import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-caption',
    templateUrl: './caption.component.html',
    styleUrls: ['./caption.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class CaptionComponent implements OnInit {
    @Input() public caption: string;

    constructor() { }

    ngOnInit() {
    }
}
