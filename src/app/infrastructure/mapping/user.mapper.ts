import { Injectable } from '@angular/core';

import { User } from '../../common/models/user';
import { RelationshipStatus } from '../../common/models/relationship-status';

@Injectable()
export class UserMapper {
    public mapResponseToUser(response: any): User {
        const user = new User();

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

        //if (response.incommingStatus === 'None') {
        //    user.incommingStatus = RelationshipStatus.None;
        //} else if (response.incommingStatus === 'Following') {
        //    user.incommingStatus = RelationshipStatus.Following;
        //} else if (response.incommingStatus === 'Requested') {
        //    user.incommingStatus = RelationshipStatus.Requested;
        //} else if (response.incommingStatus === 'Blocked') {
        //    user.incommingStatus = RelationshipStatus.Blocked;
        //}

        //if (response.outgoingStatus === 'None') {
        //    user.outgoingStatus = RelationshipStatus.None;
        //} else if (response.outgoingStatus === 'Following') {
        //    user.outgoingStatus = RelationshipStatus.Following;
        //} else if (response.outgoingStatus === 'Requested') {
        //    user.outgoingStatus = RelationshipStatus.Requested;
        //} else if (response.outgoingStatus === 'Blocked') {
        //    user.outgoingStatus = RelationshipStatus.Blocked;
        //}

        return user;
    }
}
