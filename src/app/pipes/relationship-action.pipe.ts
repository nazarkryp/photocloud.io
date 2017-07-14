import { Pipe, PipeTransform } from '@angular/core';

import { RelationshipStatus } from '../common/models/relationship-status';

@Pipe({
    name: 'relationshipAction'
})
export class RelationshipActionPipe implements PipeTransform {
    transform(relationshipStatus: RelationshipStatus): string {
        if (relationshipStatus === RelationshipStatus.None) {
            return 'Follow';
        }

        if (relationshipStatus === RelationshipStatus.Following) {
            return 'Unfollow';
        }

        if (relationshipStatus === RelationshipStatus.Requested) {
            return 'Unfollow';
        }

        return 'Unknown';
    }
}
