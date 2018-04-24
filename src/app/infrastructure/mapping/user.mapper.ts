import { Injectable } from '@angular/core';

import { UserResponse, CurrentUserResponse } from 'app/models/response';
import { UserViewModel, CurrentUserViewModel, CountersViewModel } from 'app/models/view';
import { RelationshipStatus } from 'app/models/shared';
import { IMapper } from 'app/infrastructure/mapping/mapper';
import { UserRelationship } from 'app/models/view/user-relationship.model';

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

        if (response.lastActive) {
            user.lastActive = new Date(response.lastActive);
        }

        user.relationship = new UserRelationship();

        if (response.relationship) {
            user.relationship.incommingStatus = response.relationship.incommingStatus;
            user.relationship.outgoingStatus = response.relationship.outgoingStatus;
        }

        if (response.counters) {
            user.counters = new CountersViewModel(response.counters.posts, response.counters.followers, response.counters.following);
        }

        return user;
    }

    public mapFromResponseArray(responseArray: UserResponse[]): UserViewModel[] {
        if (!responseArray) {
            return null;
        }

        return responseArray.map(e => this.mapFromResponse(e));
    }

    public mapCurrentToUser(currentUser: CurrentUserViewModel) {
        if (!currentUser) {
            return null;
        }

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

    public mapFromCurrentUserResponse(response: CurrentUserResponse): CurrentUserViewModel {
        const user = new CurrentUserViewModel();

        user.id = response.id;
        user.username = response.username;
        user.fullName = response.fullName;
        user.bio = response.bio;
        user.email = response.email;
        user.pictureUri = response.pictureUri;
        user.isPrivate = response.isPrivate;
        user.isActive = response.isActive;

        return user;
    }
}
