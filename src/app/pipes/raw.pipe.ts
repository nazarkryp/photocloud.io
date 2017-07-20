import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'raw'
})
export class RawPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        // tslint:disable-next-line:max-line-length
        // return value.replace(/#(\w+)/g, '<a class="hashtag" href="https://www.google.com/?q=$1" style="color: #e91e63;text-decoration: none;font-weight: bold;">$&</a>');
        return value.replace(/#(\w+)/g, "<a class='hashtag' href='https://www.google.com/?q=$1' target='_blank'>$&</a>");
    }

}
