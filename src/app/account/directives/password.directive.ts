import { Directive, ElementRef, Renderer, HostListener, Input } from '@angular/core';
import { MatInput } from '@angular/material';

@Directive({
    selector: '[appPassword]'
})
export class PasswordDirective {
    @Input() appPassword: HTMLInputElement;
    @Input() appPasswordType: string;

    @HostListener('mousedown', ['$event']) public mousedown(event: any) {
        if (!this.appPasswordType) {
            throw new Error('\'appPasswordType\' is missing');
        }

        this.appPassword.type = this.appPasswordType;
    }
}
