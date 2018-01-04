import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { trigger, style, animate, transition, query, stagger } from '@angular/animations';

import { Subscription } from 'rxjs/Subscription';

import { UserService, IncommingRequestsService } from 'app/services';

import { UserViewModel, IncommingRequestViewModel } from 'app/models/view';
import { RelationshipAction } from 'app/models/shared';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.css'],
    animations: [
        trigger('enterTransition', [
            transition(':enter', [
                style({ transform: 'translateX(50px)', opacity: 0 }),
                animate('1000ms cubic-bezier(0.35, 0, 0.25, 1)', style('*'))
            ])
        ])
    ]
})
export class NotificationsComponent implements OnInit {
    @Output() onClosing: EventEmitter<any> = new EventEmitter<any>();

    public incommingRequests: IncommingRequestViewModel[];
    public isLoading: boolean;

    constructor(
        private incommingRequestService: IncommingRequestsService,
        private userService: UserService) { }

    public getIncommingRequests() {
        this.isLoading = true;
        this.incommingRequestService.getIncommingRequests()
            .finally(() => {
                this.isLoading = false;
            })
            .subscribe(incommingRequests => {
                this.incommingRequests = incommingRequests as IncommingRequestViewModel[];
            });
    }

    public confirmIncommingRequest(incommingRequest: IncommingRequestViewModel) {
        incommingRequest.isConfirmingIncommingRequest = true;
        this.userService.modifyRelationship(incommingRequest.id, {
            action: RelationshipAction.Approve
        }).finally(() => {
            incommingRequest.isConfirmingIncommingRequest = true;
        }).subscribe(userResult => {
            const indexToRemove = this.incommingRequests.findIndex(e => e.id === incommingRequest.id);
            this.incommingRequests.splice(indexToRemove, 1);
            this.incommingRequestService.updateIncommingRequestsCount(this.incommingRequests.length);
            incommingRequest.isConfirmed = true;
        });
    }

    public removeIncommingRequest(incommingRequest: IncommingRequestViewModel) {
        incommingRequest.isRemovingIncommingRequest = true;
        this.userService.modifyRelationship(incommingRequest.id, {
            action: RelationshipAction.Reject
        }).finally(() => {
            incommingRequest.isRemovingIncommingRequest = false;
        }).subscribe(userResult => {
            const indexToRemove = this.incommingRequests.findIndex(e => e.id === incommingRequest.id);
            this.incommingRequests.splice(indexToRemove, 1);
            this.incommingRequestService.updateIncommingRequestsCount(this.incommingRequests.length);
            incommingRequest.isRemoved = true;
        });
    }

    public close() {
        this.onClosing.emit({ ok: true });
    }

    public ngOnInit() {
        this.getIncommingRequests();
    }
}
