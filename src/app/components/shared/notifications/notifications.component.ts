import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { trigger, style, animate, transition, query, stagger } from '@angular/animations';

import { Subscription } from 'rxjs/Subscription';

import { UserService } from 'app/services';

import { UserViewModel } from 'app/models/view';
import { RelationshipAction } from 'app/models/shared';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.css'],
    animations: [
        trigger('enterTransition', [
            transition(':enter', [
                style({ transform: 'translateX(50px)', opacity: 0 }),
                animate('1200ms cubic-bezier(0.35, 0, 0.25, 1)', style('*'))
            ])
        ])
    ]
})
export class NotificationsComponent implements OnInit, OnDestroy {
    private incommingRequestsSubscription$: Subscription;
    @Output() onClosing: EventEmitter<any> = new EventEmitter<any>();

    public incommingRequests: UserViewModel[];
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

    public confirmIncommingRequest(user: UserViewModel) {
        this.userService.modifyRelationship(user.id, {
            action: RelationshipAction.Approve
        }).subscribe(userResult => {
            const indexToRemove = this.incommingRequests.findIndex(e => e.id === user.id);
            this.incommingRequests.splice(indexToRemove, 1);
        });
    }

    public removeIncommingRequest(user: UserViewModel) {
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
