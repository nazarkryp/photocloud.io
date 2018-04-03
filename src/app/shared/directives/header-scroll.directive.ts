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
    private scrolledDown = false;
    private triggered = false;
    @Input()
    public scrollOffset = 3000;
    @Output()
    public scrollPosition = new EventEmitter();

    @Output()
    public scrollDirection = new EventEmitter();

    constructor(
        @Inject(DOCUMENT) private document: Document) { }

    @HostListener('window:scroll', ['$event'])
    public onScroll(event) {
        if (_window().scrollY >= 50 && !this.triggered) {
            this.triggered = true;
            this.scrollPosition.next(true);
        }

        if (this.triggered && _window().scrollY < 50) {
            this.triggered = false;
            this.scrollPosition.next(false);
        }

        // if (!this.previousValue) {
        //     this.previousValue = _window().scrollY;
        // }

        if (_window().scrollY > this.previousValue) {
            if (!this.scrolledDown) {
                this.scrollDirection.next(ScrollDirection.Down);
            }

            this.previousValue = _window().scrollY;
            this.scrolledDown = true;
        } else {
            if (this.scrolledDown) {
                this.scrollDirection.next(ScrollDirection.Up);
            }

            this.previousValue = _window().scrollY;
            this.scrolledDown = false;
        }

        // if (_window().scrollY - this.previousValue === 65) {
        //     console.log('scrolled down');
        //     this.previousValue = _window().scrollY;
        // }

        // if (_window().scrollY - this.previousValue === -65) {
        //     console.log('scrolled up');
        //     this.previousValue = _window().scrollY;
        // }

        // // console.log(Math.abs(_window().scrollY - this.previousValue));
        // if (Math.abs(_window().scrollY - this.previousValue) > 65) {
        //     this.previousValue = _window().scrollY;
        //     console.log(this.previousValue);
        // }
    }
}

export enum ScrollDirection {
    Up = 0,
    Down = 1
}
