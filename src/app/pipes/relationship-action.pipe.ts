import { Pipe, PipeTransform } from '@angular/core';

import { RelationshipStatus } from 'app/models/shared';

@Pipe({
    name: 'relationshipAction'
})
export class RelationshipActionPipe implements PipeTransform {
    public transform(relationshipStatus: number): string {
        if (relationshipStatus === RelationshipStatus.None) {
            return 'follow';
        }

        if (relationshipStatus === RelationshipStatus.Following) {
            return 'following';
        }

        if (relationshipStatus === RelationshipStatus.Requested) {
            return 'requested';
        }

        if (relationshipStatus === RelationshipStatus.Blocked) {
            return 'unblock';
        }

        return 'Unknown';
    }
}
