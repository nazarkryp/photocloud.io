import { Directive, Input, ElementRef, Inject, Optional, NgZone } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ThemePalette } from '@angular/material/core';
import { AriaDescriber } from '@angular/cdk/a11y';
import { DOCUMENT } from '@angular/common';

let nextId = 0;

export type MatBadgePosition = 'above after' | 'above before' | 'below before' | 'below after';
export type MatBadgeSize = 'small' | 'medium' | 'large';

/** Directive to display a text badge. */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[matBadge]',
    // tslint:disable-next-line:use-host-property-decorator
    host: {
        'class': 'mat-badge',
        '[class.mat-badge-overlap]': '_overlap',
        '[class.mat-badge-above]': 'isAbove()',
        '[class.mat-badge-below]': '!isAbove()',
        '[class.mat-badge-before]': '!isAfter()',
        '[class.mat-badge-after]': 'isAfter()',
        '[class.mat-badge-small]': 'size === "small"',
        '[class.mat-badge-medium]': 'size === "medium"',
        '[class.mat-badge-large]': 'size === "large"',
        '[class.mat-badge-hidden]': 'hidden',
    },
})
// tslint:disable-next-line:directive-class-suffix
export class MatBadge {

    /** The color of the badge. Can be `primary`, `accent`, or `warn`. */
    @Input('matBadgeColor')
    get color(): ThemePalette { return this._color; }
    set color(value: ThemePalette) {
        this._setColor(value);
        this._color = value;
    }
    private _color: ThemePalette = 'primary';

    /** Whether the badge should overlap its contents or not */
    @Input('matBadgeOverlap')
    get overlap(): boolean { return this._overlap; }
    set overlap(val: boolean) {
        this._overlap = coerceBooleanProperty(val);
    }
    private _overlap = true;

    /**
     * Position the badge should reside.
     * Accepts any combination of 'above'|'below' and 'before'|'after'
     */
    // tslint:disable-next-line:no-input-rename
    @Input('matBadgePosition') position: MatBadgePosition = 'above after';

    /** The content for the badge */
    @Input('matBadge')
    get content(): string { return this._content; }
    set content(val: string) {
        this._content = val;
        const content = this._updateTextContent();
        this._ariaDescriber.describe(content, val);
    }
    private _content: string;

    /** Message used to describe the decorated element via aria-describedby */
    @Input('matBadgeDescription')
    get description(): string { return this._description; }
    set description(val: string) {
        if (this._description) {
            this._updateHostAriaDescription(val, this._description);
        }
        this._description = val;
    }
    private _description: string;

    /** Size of the badge. Can be 'small', 'medium', or 'large'. */
    // tslint:disable-next-line:no-input-rename
    @Input('matBadgeSize') size: MatBadgeSize = 'medium';

    /** Whether the badge is hidden. */
    @Input('matBadgeHidden')
    get hidden(): boolean { return this._hidden; }
    set hidden(val: boolean) {
        this._hidden = coerceBooleanProperty(val);
    }
    private _hidden: boolean;

    /** Unique id for the badge */
    _id: number = nextId++;

    private _badgeElement: HTMLElement;

    constructor(
        @Optional() @Inject(DOCUMENT) private _document: any,
        private _ngZone: NgZone,
        private _elementRef: ElementRef,
        private _ariaDescriber: AriaDescriber) { }

    /** Whether the badge is above the host or not */
    isAbove(): boolean {
        return this.position.indexOf('below') === -1;
    }

    /** Whether the badge is after the host or not */
    isAfter(): boolean {
        return this.position.indexOf('before') === -1;
    }

    /** Injects a span element into the DOM with the content. */
    private _updateTextContent(): HTMLSpanElement {
        if (!this._badgeElement) {
            this._badgeElement = this._createBadgeElement();
        } else {
            this._badgeElement.textContent = this.content;
        }
        return this._badgeElement;
    }

    /** Creates the badge element */
    private _createBadgeElement(): HTMLElement {
        const badgeElement = this._document.createElement('span');
        badgeElement.setAttribute('id', `mat-badge-content-${this._id}`);
        badgeElement.classList.add('mat-badge-content');
        badgeElement.textContent = this.content;

        if (this.description) {
            badgeElement.setAttribute('aria-label', this.description);
        }

        this._elementRef.nativeElement.appendChild(badgeElement);

        // animate in after insertion
        this._ngZone.runOutsideAngular(() => requestAnimationFrame(() => {
            // ensure content available
            if (badgeElement) {
                badgeElement.classList.add('mat-badge-active');
            }
        }));

        return badgeElement;
    }

    /** Sets the aria-label property on the element */
    private _updateHostAriaDescription(val: string, prevVal: string): void {
        // ensure content available before setting label
        const content = this._updateTextContent();
        this._ariaDescriber.removeDescription(content, prevVal);
        this._ariaDescriber.describe(content, val);
    }

    /** Adds css theme class given the color to the component host */
    private _setColor(colorPalette: ThemePalette) {
        if (colorPalette !== this._color) {
            if (this._color) {
                this._elementRef.nativeElement.classList.remove(`mat-badge-${this._color}`);
            }
            if (colorPalette) {
                this._elementRef.nativeElement.classList.add(`mat-badge-${colorPalette}`);
            }
        }
    }

}
