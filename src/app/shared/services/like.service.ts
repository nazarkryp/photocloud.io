import { Injectable } from '@angular/core';

import { MediaViewModel, UserViewModel, CurrentUserViewModel } from 'app/models/view';
import { MediaService } from 'app/services';
import { CurrentUserService } from 'app/infrastructure/services';
import { UserMapper } from 'app/infrastructure/mapping';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LikeService {
    private currentUser: UserViewModel;

    constructor(
        private userMapper: UserMapper,
        private currentUserService: CurrentUserService,
        private mediaService: MediaService) {
        const currentUser = this.currentUserService.retrieveCurrentUser();
        this.currentUser = this.userMapper.mapCurrentToUser(currentUser);
    }

    public like(media: MediaViewModel): Observable<any> {
        if (media.userHasLiked) {
            return this.removeLike(media);
        } else {
            return this.addLike(media);
        }
    }

    private removeLike(media: MediaViewModel): Observable<any> {
        media.likesCount--;
        media.userHasLiked = false;

        const indexToRemove = media.likes.findIndex(e => e.id === this.currentUser.id);
        media.likes.splice(indexToRemove, 1);

        return this.mediaService.removeMediaLike(media.id)
            .do(() => { }, (error) => {
                media.likes.push(this.currentUser);
                media.likesCount++;
                media.userHasLiked = true;
            });
    }

    private addLike(media: MediaViewModel): Observable<any> {
        media.likesCount++;
        media.userHasLiked = true;

        media.likes.push(this.currentUser);

        return this.mediaService.addMediaLike(media.id)
            .do(() => { }, (error) => {
                media.likesCount--;
                media.userHasLiked = false;
                const indexToRemove = media.likes.findIndex(e => e.id === this.currentUser.id);
                media.likes.splice(indexToRemove, 1);
            });
    }
}
