import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {
    public transform(time: any, reference?: any): string {
        time = new Date(time);
        const ref: Date = new Date(reference);

        if (!time.getTime()) {
            return 'Invalid Date';
        }

        const start = isNaN(ref.getTime()) ? Date.now() : ref.getTime();
        let difference = Math.floor((start - time.getTime()) / 1000);

        if (difference < 2) {
            return '1 second ago';
        }

        if (difference < 60) {
            return Math.floor(difference) + ' seconds ago';
        }

        difference = difference / 60;

        if (difference < 2) {
            return '1 minute ago';
        }

        if (difference < 60) {
            return Math.floor(difference) + ' minutes ago';
        }

        difference = difference / 60;

        if (difference < 2) {
            return '1 hour ago';
        }

        if (difference < 24) {
            return Math.floor(difference) + ' hours ago';
        }

        difference = difference / 24;

        if (difference < 2) {
            return '1 day ago';
        }

        if (difference < 30) {
            return Math.floor(difference) + ' days ago';
        }

        difference = difference / 30;

        if (difference < 2) {
            return '1 month ago';
        }
        if (difference < 12) {
            return Math.floor(difference) + ' months ago';
        }

        difference = difference / 12;

        if (difference < 2) {
            return '1 year ago';
        } else {
            return Math.floor(difference) + ' years ago';
        }
    }
}
