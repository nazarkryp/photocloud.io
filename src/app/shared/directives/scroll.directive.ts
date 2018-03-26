import { Directive, HostListener, ElementRef, Output, EventEmitter, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';

function _window(): Window {
    return window;
}

@Directive({
    selector: '[appScroll]'
})
export class ScrollDirective {
    private previousOffset: number;

    @Input()
    public scrollOffset = 3000;

    @Input()
    public appScrollTriggerOnce = true;
    @Output()
    public scrollPosition = new EventEmitter();

    constructor(
        @Inject(DOCUMENT) private document: Document) { }

    @HostListener('window:scroll', ['$event'])
    public onScroll(event) {
        if (((_window().innerHeight + _window().scrollY) >= (this.document.body.offsetHeight - this.scrollOffset)) && (!this.appScrollTriggerOnce || this.previousOffset !== this.document.body.offsetHeight)) {
            this.previousOffset = this.document.body.offsetHeight;
            this.scrollPosition.next(true);
        }
    }
}
