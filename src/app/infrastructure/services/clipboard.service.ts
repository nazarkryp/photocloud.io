import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class ClipboardService {
    constructor(
        @Inject(DOCUMENT) private document: Document) {
    }

    public copy(value: string): Promise<string> {
        const promise = new Promise<string>(
            (resolve, reject): void => {
                let textarea = null;

                try {
                    textarea = this.document.createElement('textarea');
                    textarea.style.height = '0px';
                    textarea.style.left = '-100px';
                    textarea.style.opacity = '0';
                    textarea.style.position = 'fixed';
                    textarea.style.top = '-100px';
                    textarea.style.width = '0px';
                    this.document.body.appendChild(textarea);

                    textarea.value = value;
                    textarea.select();

                    this.document.execCommand('copy');

                    resolve(value);
                } finally {
                    if (textarea && textarea.parentNode) {
                        textarea.parentNode.removeChild(textarea);
                    }
                }
            }
        );

        return promise;
    }
}
