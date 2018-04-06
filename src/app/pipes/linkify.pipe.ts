import { Inject, Pipe, PipeTransform } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import * as linkify from 'linkifyjs';
import * as linkifyStr from 'linkifyjs/string';
import * as hashtag from 'linkifyjs/plugins/hashtag';
import * as mention from 'linkifyjs/plugins/mention';

@Pipe({
    name: 'linkify'
})
export class LinkifyPipe implements PipeTransform {
    constructor(
        @Inject(DOCUMENT) dom: Document) {
        hashtag(linkify);
        mention(linkify);
    }

    public transform(text: any): string {
        return linkifyStr(text, this.options());
    }

    private options(): any {
        return {
            attributes: {
                rel: 'noopener'
            },
            className: {
                mention: () => {
                    return 'mention';
                },
                hashtag: () => {
                    return 'hashtag';
                },
                url: () => {
                    return 'link';
                },
                email: () => {
                    return 'link';
                }
            },
            format: function (value: string, type: string) {
                if (value && type && type === 'url') {
                    value = value.replace('https://www.', '');
                    value = value.replace('http://www.', '');
                    value = value.replace('https://', '');
                    value = value.replace('http://', '');
                    value = value.endsWith('/') ? value.substring(0, value.length - 1) : value;
                }

                return value;
            },
            formatHref: {
                mention: (username: string) => {
                    return this.getUserProfileLink(username);
                },
                hashtag: (tag: string) => {
                    return this.getTagLink(tag);
                },
                url: (url: string) => {
                    return url;
                }
            },
            nl2br: false,
            tagName: 'a',
            validate: true
        };
    }

    private getUserProfileLink(username: string) {
        username = username.startsWith('/') ? username.substring(1) : username;
        return `${this.baseAddress}/${username}`;
    }

    private getTagLink(tag: string) {
        if (tag.startsWith('#')) {
            tag = tag.substring(1);
        }

        return `${this.baseAddress}/explore/tags/${tag}`;
    }

    private get baseAddress(): string {
        const pathArray = document.location.href.split('/');
        const protocol = pathArray[0];
        const host = pathArray[2];

        return `${protocol}//${host}`;
    }
}
