import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'activity'
})
export class ActivityPipe implements PipeTransform {
    public transform(activityType: number): string {
        if (activityType === 0) {
            return 'started following you';
        } else if (activityType === 1) {
            return 'sent you friendship request';
        } else if (activityType === 2) {
            return 'commented your post';
        } else if (activityType === 3) {
            return 'liked your post';
        } else {
            return 'unknown;'
        }
    }
}
