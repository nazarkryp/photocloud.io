import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-attachment-counter',
    templateUrl: './attachment-counter.component.html',
    styleUrls: ['./attachment-counter.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AttachmentCounterComponent {
    @Input()
    public currentIndex: number;

    @Input()
    public total: number;
}
