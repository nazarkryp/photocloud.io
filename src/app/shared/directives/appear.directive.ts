import { ElementRef, Output, Directive, AfterViewInit, OnDestroy, EventEmitter } from '@angular/core';

import { Observable, fromEvent, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';


@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[appear]'
})
export class AppearDirective implements AfterViewInit, OnDestroy {
    @Output() public appear: EventEmitter<void>;

    public elementPos: number;
    public elementHeight: number;

    public scrollPos: number;
    public windowHeight: number;

    public subscriptionScroll: Subscription;
    public subscriptionResize: Subscription;

    constructor(
        private element: ElementRef) {
        this.appear = new EventEmitter<void>();
    }

    public saveDimensions() {
        this.elementPos = this.getOffsetTop(this.element.nativeElement);
        this.elementHeight = this.element.nativeElement.offsetHeight;
        this.windowHeight = window.innerHeight;
    }

    public saveScrollPos() {
        this.scrollPos = window.scrollY;
    }

    public getOffsetTop(element: any) {
        let offsetTop = element.offsetTop || 0;
        if (element.offsetParent) {
            offsetTop += this.getOffsetTop(element.offsetParent);
        }
        return offsetTop;
    }

    public checkVisibility() {
        if (this.isVisible()) {
            // double check dimensions (due to async loaded contents, e.g. images)
            this.saveDimensions();
            if (this.isVisible()) {
                this.unsubscribe();
                this.appear.emit();
            }
        }
    }

    public isVisible() {
        return this.scrollPos >= this.elementPos || (this.scrollPos + this.windowHeight) >= (this.elementPos + 20);
    }

    public subscribe() {
        this.subscriptionScroll = fromEvent(window, 'scroll').pipe(startWith(null))
            .subscribe(() => {
                this.saveScrollPos();
                this.checkVisibility();
            });
        this.subscriptionResize = fromEvent(window, 'resize').pipe(startWith(null))
            .subscribe(() => {
                this.saveDimensions();
                this.checkVisibility();
            });
    }

    public unsubscribe() {
        if (this.subscriptionScroll) {
            this.subscriptionScroll.unsubscribe();
        }
        if (this.subscriptionResize) {
            this.subscriptionResize.unsubscribe();
        }
    }

    public ngAfterViewInit() {
        this.subscribe();
    }

    public ngOnDestroy() {
        this.unsubscribe();
    }
}
