import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'raw'
})
export class RawPipe implements PipeTransform {
    transform(value: any, args?: any): any {
        value = value.replace(/@(\w+)/g, '<a class=\'hashtag\' href=\'$1\'>$&</a>');
        return value.replace(/#(\w+)/g, '<a class=\'hashtag\' href=\'explore/tags/$1\'>$&</a>');
    }
}
