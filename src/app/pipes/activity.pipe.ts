import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'activity'
})
export class ActivityPipe implements PipeTransform {
    public transform(activityType: number): string {
        if (activityType === 0) {
            return 'started following you';
        } else if (activityType === 1) {
            return 'stopped following you';
        } else if (activityType === 2) {
            return 'sent you a friendship request';
        } else if (activityType === 3) {
            return 'accepted your request';
        } else if (activityType === 4) {
            return 'rejected your request';
        } else if (activityType === 5) {
            return 'added you to black list';
        } else if (activityType === 6) {
            return 'removed you from black list. Now you can follow him';
        } else if (activityType === 7) {
            return 'commented on your post';
        } else if (activityType === 8) {
            return 'liked your post';
        } else {
            return 'unknown';
        }
    }
}
