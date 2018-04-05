import { Pipe, PipeTransform } from '@angular/core';
// import * as linkify from 'linkifyjs';
import * as linkifyStr from 'linkifyjs/string';
import * as linkify from 'linkifyjs';
import * as hashtag from 'linkifyjs/plugins/hashtag';
import * as mention from 'linkifyjs/plugins/mention';

@Pipe({
    name: 'linkify'
})
export class LinkifyPipe implements PipeTransform {
    public transform(text: any): string {
        // console.log(linkify);
        // if (text) {
        //     const arr: any[] = linkify.find(text);

        //     arr.forEach((item) => {
        //         if (item.type === 'url') {
        //             text = text.replace(item.href, `<a class="primary" href=\'${item.href}\' rel=\'noopener\' target=\'_blank\'>${item.href}</a>`);
        //         }
        //     });
        // }

        hashtag(linkify);
        mention(linkify);

        const options = this.options();
        // console.log(text);
        // const result = linkifyStr(text, options);

        const result = linkifyStr(text, options);

        return result;
    }

    private options(): any {
        return {
            attributes: null,
            className: 'primary',
            format: function (value, type) {
                return value;
            },
            formatHref: {
                mention: (username) => {
                    console.log(username);
                    return this.getUserProfileLink(username);
                },
                hashtag: (tag) => {
                    return this.getTagLink(tag);
                },
                url: (url) => {
                    return url;
                }
            },
            nl2br: false,
            tagName: 'a',
            validate: true
        };
    }

    private getUserProfileLink(username: string) {
        return `${this.baseAddress}${username}`;
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
