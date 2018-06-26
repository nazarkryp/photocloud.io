import { Directive, ElementRef, Input, Renderer, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
    selector: '[appImagePreview]'
})
export class ImagePreviewDirective implements OnChanges {
    @Input() public image: any;

    constructor(private el: ElementRef, private renderer: Renderer) { }

    public ngOnChanges(changes: SimpleChanges) {
        const reader = new FileReader();
        const el = this.el;

        reader.onloadend = function (e) {
            el.nativeElement.src = reader.result;

            if (el.nativeElement.localName === 'video') {
                el.nativeElement.muted = 'muted';
                el.nativeElement.play();
            }
        };

        if (this.image) {
            return reader.readAsDataURL(this.image);
        }
    }
}
