import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';


import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';


import { UserService, MediaService } from 'app/services';
import { Page, UserViewModel, ErrorViewModel, CurrentUserViewModel } from 'app/models/view';

import { UserMediaViewModel } from 'app/models/view';
import { ValidationResult, RelationshipStatus } from 'app/models/shared';
import { CurrentUserService } from 'app/infrastructure/services';

@Injectable()
export class UserMediaResolver implements Resolve<UserViewModel> {
    constructor(
        private currentUserService: CurrentUserService,
        private mediaService: MediaService,
        private userService: UserService) {
    }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserViewModel> {
        const username = route.paramMap.get('username');
        const userMedia = new UserMediaViewModel();

        return this.userService.getUser(username)
            .pipe(mergeMap<UserViewModel, UserMediaViewModel>(user => {
                const currentUser = this.currentUserService.retrieveCurrentUser();
                userMedia.user = user;
                this.updateCurrentUser(currentUser, user);

                const validationResult = this.validateUser(currentUser, user);
                if (validationResult.hasErrors) {
                    userMedia.error = validationResult.error;

                    return of(userMedia);
                }

                return this.mediaService.getUserMedia(username, null)
                    .pipe(map(page => {
                        userMedia.page = page;
                        return userMedia;
                    }));
            }))
            .pipe(catchError(error => {
                return of(error);
            }));
    }

    private validateUser(currentUser: CurrentUserViewModel, user: UserViewModel): ValidationResult {
        const validationResult: ValidationResult = new ValidationResult();

        if (!user.isActive) {
            validationResult.hasErrors = true;
            validationResult.error = new ErrorViewModel('Account is not active');
        } else if (user.isPrivate
            && (!currentUser || user.id !== currentUser.id)
            && user.relationship.outgoingStatus !== RelationshipStatus.Following) {
            validationResult.hasErrors = true;
            validationResult.error = new ErrorViewModel('Account is private');
            validationResult.error.description = currentUser
                ? `Follow <strong>${user.username}</strong> to see all their photos` :
                `Already know <strong>${user.username}?</strong> Sign in to see all their photos`;
        }

        return validationResult;
    }

    private updateCurrentUser(currentUser: CurrentUserViewModel, user: UserViewModel) {
        if (currentUser && user.id === currentUser.id
            && (user.isActive !== currentUser.isActive || user.isPrivate !== currentUser.isPrivate || user.pictureUri !== currentUser.pictureUri)) {
            this.currentUserService.updateUser({
                isActive: user.isActive,
                isPrivate: user.isPrivate,
                pictureUri: user.pictureUri
            });
        }
    }
}
