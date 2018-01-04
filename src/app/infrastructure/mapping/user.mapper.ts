import { Injectable } from '@angular/core';

import { UserResponse } from 'app/models/response';
import { UserViewModel, CurrentUserViewModel } from 'app/models/view';
import { RelationshipStatus } from 'app/models/shared';
import { IMapper } from 'app/infrastructure/mapping/mapper';

@Injectable()
export class UserMapper implements IMapper<UserResponse, UserViewModel> {
    public mapFromResponse(response: UserResponse): UserViewModel {
        const user = new UserViewModel();

        user.id = response.id;
        user.username = response.username;
        user.fullName = response.fullName;
        user.bio = response.bio;
        user.pictureUri = response.pictureUri;
        user.isPrivate = response.isPrivate;
        user.isActive = response.isActive;
        user.posts = response.posts;
        user.followers = response.followers;
        user.following = response.following;
        user.lastActive = new Date(response.lastActive);
        user.incommingStatus = response.incommingStatus;
        user.outgoingStatus = response.outgoingStatus;

        return user;
    }

    public mapFromResponseArray(responseArray: UserResponse[]): UserViewModel[] {
        if (!responseArray) {
            return null;
        }

        return responseArray.map(e => this.mapFromResponse(e));
    }

    public mapCurrentToUser(currentUser: CurrentUserViewModel) {
        const user = new UserViewModel();

        user.id = currentUser.id;
        user.username = currentUser.username;
        user.bio = currentUser.bio;
        user.fullName = currentUser.fullName;
        user.email = currentUser.email;
        user.isActive = currentUser.isActive;
        user.isPrivate = currentUser.isPrivate;

        return user;
    }
}
