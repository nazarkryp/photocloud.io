import { Input, Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'img[default]',
})
export class DefaultImageDirective {
    @Input() default: string;

    @HostBinding('attr.src') @Input() src;
    @HostListener('error') updateUri() {
        this.src = this.default;
    }
}
