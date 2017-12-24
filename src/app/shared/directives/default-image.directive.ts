import { Input, Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'img[default]',
})
export class DefaultImageDirective {
    @Input() public default: string;

    @HostBinding('attr.src') @Input() public src;
    @HostListener('error') public updateUri() {
        this.src = this.default;
    }
}
