import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
    public transform(text: any, length: number): string {
        if (typeof text !== 'string') {
            return '';
        }

        let result = text.substr(0, length);

        if (text.length > length) {
            if (result.lastIndexOf(' ') > 0) {
                result = result.trim();
            }

            result += '...';
        }

        return result;
    }
}
