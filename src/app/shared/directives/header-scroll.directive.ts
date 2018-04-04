import { Directive, HostListener, ElementRef, Output, EventEmitter, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';

function _window(): Window {
    return window;
}

@Directive({
    selector: '[appHeaderScroll]'
})
export class HeaderScrollDirective {
    private previousValue = 0;
    private direction: ScrollDirection = ScrollDirection.Up;
    private triggered = false;

    private minTopScrollOffset = 25;
    @Output()
    public scrollPosition = new EventEmitter();

    @Output()
    public scrollDirection = new EventEmitter();

    constructor(
        @Inject(DOCUMENT) private document: Document) { }

    @HostListener('window:scroll', ['$event'])
    public onScroll(event) {
        if (_window().scrollY >= this.minTopScrollOffset && !this.triggered) {
            this.triggered = true;
            this.scrollPosition.next(this.triggered);
        }

        if (_window().scrollY < this.minTopScrollOffset && this.triggered) {
            this.triggered = false;
            this.scrollPosition.next(this.triggered);
        }

        if (_window().scrollY > this.previousValue) {
            if (this.direction === ScrollDirection.Up) {
                this.scrollDirection.next(ScrollDirection.Down);
            }

            this.direction = ScrollDirection.Down;
        } else {
            if (this.direction === ScrollDirection.Down) {
                this.scrollDirection.next(ScrollDirection.Up);
            }

            this.direction = ScrollDirection.Up;
        }

        this.previousValue = _window().scrollY;
    }
}

export enum ScrollDirection {
    Up = 0,
    Down = 1
}
