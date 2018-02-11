import { RelationshipStatus } from '../shared/relationship-status';
import { UserRelationship } from './user-relationship.model';

export class UserViewModel {
    private _lastActive: Date;

    public id: number;
    public username: string;
    public fullName: string;
    public bio: string;
    public email: string;
    public isPrivate: boolean;
    public isActive: boolean;
    public pictureUri: string;
    public posts: number;
    public followers: number;
    public following: number;
    public relationship: UserRelationship;
    public isModifyingRelationship = false;

    public get lastActive(): Date {
        return this._lastActive;
    }

    public set lastActive(lastActive: Date) {
        this._lastActive = lastActive;
        // const newDate = new Date(lastActive.getTime() + lastActive.getTimezoneOffset() * 60 * 1000);
        // const offset = lastActive.getTimezoneOffset() / 60;
        // const hours = lastActive.getHours();
        // newDate.setHours(hours - offset);
        // this._lastActive = newDate;
    }
}
