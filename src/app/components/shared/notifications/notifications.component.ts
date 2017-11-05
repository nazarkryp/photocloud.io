import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { UserService } from '../../../services';

import { User, RelationshipAction } from '../../../common/models';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {
    private incommingRequestsSubscription$: Subscription;
    @Output() onClosing: EventEmitter<any> = new EventEmitter<any>();

    public incommingRequests: User[];
    public isLoading: boolean;

    constructor(
        private userService: UserService) { }

    public getIncommingRequests() {
        this.isLoading = true;
        this.incommingRequestsSubscription$ = this.userService.getIncommingRequests()
            .finally(() => {
                this.isLoading = false;
            })
            .subscribe(incommingRequests => {
                this.incommingRequests = incommingRequests;
            });
    }

    public confirmIncommingRequest(user: User) {
        this.userService.modifyRelationship(user.id, {
            action: RelationshipAction.Approve
        }).subscribe(userResult => {
            const indexToRemove = this.incommingRequests.findIndex(e => e.id === user.id);
            this.incommingRequests.splice(indexToRemove, 1);
        });
    }

    public removeIncommingRequest(user: User) {
        this.userService.modifyRelationship(user.id, {
            action: RelationshipAction.Reject
        }).subscribe(userResult => {
            const indexToRemove = this.incommingRequests.findIndex(e => e.id === user.id);
            this.incommingRequests.splice(indexToRemove, 1);
        });
    }

    public close() {
        this.onClosing.emit({ ok: true });
    }

    public ngOnInit() {
        this.getIncommingRequests();
    }

    public ngOnDestroy(): void {
        this.incommingRequestsSubscription$.unsubscribe();
    }
}
