import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements OnInit {
    constructor(
        private ref: ElementRef) { }

    public ngOnInit(): void {
        this.ref.nativeElement.focus();
    }
}
