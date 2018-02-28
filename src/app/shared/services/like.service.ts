import { Injectable } from '@angular/core';

import { MediaViewModel, UserViewModel, CurrentUserViewModel } from 'app/models/view';
import { MediaService } from 'app/services';
import { CurrentUserService } from 'app/infrastructure/services';
import { UserMapper } from 'app/infrastructure/mapping';

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

    public like(media: MediaViewModel) {
        if (media.userHasLiked) {
            this.removeLike(media);
        } else {
            this.addLike(media);
        }
    }

    private removeLike(media: MediaViewModel) {
        media.likesCount--;
        media.userHasLiked = false;

        const indexToRemove = media.likes.findIndex(e => e.id === this.currentUser.id);
        media.likes.splice(indexToRemove, 1);

        this.mediaService.removeMediaLike(media.id)
            .subscribe(() => { }, (error) => {
                media.likes.push(this.currentUser);
                media.likesCount++;
                media.userHasLiked = true;
            });
    }

    private addLike(media: MediaViewModel) {
        media.likesCount++;
        media.userHasLiked = true;

        media.likes.push(this.currentUser);

        this.mediaService.addMediaLike(media.id)
            .subscribe(() => { }, (error) => {
                media.likesCount--;
                media.userHasLiked = false;
                const indexToRemove = media.likes.findIndex(e => e.id === this.currentUser.id);
                media.likes.splice(indexToRemove, 1);
            });
    }
}
