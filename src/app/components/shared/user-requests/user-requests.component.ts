import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { trigger, style, animate, transition, query, stagger } from '@angular/animations';

import { Subscription } from 'rxjs/Subscription';

import { UserService, RequestsService } from 'app/services';

import { UserViewModel, RequestViewModel, Page, CurrentUserViewModel } from 'app/models/view';
import { RelationshipAction } from 'app/models/shared';
import { MatTabChangeEvent } from '@angular/material';
import { CurrentUserService } from 'app/infrastructure/services';

@Component({
    selector: 'app-user-requests',
    templateUrl: './user-requests.component.html',
    styleUrls: ['./user-requests.component.css'],
    animations: [
        trigger('enterTransition', [
            transition(':enter', [
                style({ transform: 'translateX(50px)', opacity: 0 }),
                animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style('*'))
            ])
        ])
    ]
})
export class UserRequestsComponent implements OnInit {
    @Output() onClosing: EventEmitter<any> = new EventEmitter<any>();

    public currentUser: CurrentUserViewModel;
    public incommingRequestsPage: Page<RequestViewModel> = new Page<RequestViewModel>();
    public outgoingRequestsPage: Page<RequestViewModel> = new Page<RequestViewModel>();
    public incommingRequestsSubscription: Subscription;
    public outgoingRequestsSubscription: Subscription;
    public isLoading: boolean;
    public selectedTabIndex = 0;

    constructor(
        private currentUserService: CurrentUserService,
        private requestService: RequestsService,
        private userService: UserService) {
        this.currentUser = this.currentUserService.retrieveCurrentUser();
        this.selectedTabIndex = this.currentUser.isPrivate ? 0 : 1;
    }

    public selectedTabChange(event: MatTabChangeEvent) {
        if (this.incommingRequestsSubscription != null && !this.incommingRequestsSubscription.closed) {
            this.incommingRequestsSubscription.unsubscribe();
            this.isLoading = false;
        }

        if (this.outgoingRequestsSubscription != null && !this.outgoingRequestsSubscription.closed) {
            this.outgoingRequestsSubscription.unsubscribe();
            this.isLoading = false;
        }

        if (event.index === 0) {
            this.incommingRequestsPage = new Page<RequestViewModel>();
            this.getIncommingRequests();
        } else {
            this.outgoingRequestsPage = new Page<RequestViewModel>();
            this.getOutgoingRequests();
        }

        this.selectedTabIndex = event.index;
    }

    public getIncommingRequests() {
        this.isLoading = true;
        this.incommingRequestsSubscription = this.requestService.getIncommingRequests(this.incommingRequestsPage.pagination)
            .finally(() => {
                this.isLoading = false;
            })
            .subscribe(page => {
                this.incommingRequestsPage.hasMoreItems = page.hasMoreItems;
                this.incommingRequestsPage.pagination = page.pagination;

                if (page.data) {
                    const items = page.data as RequestViewModel[];
                    this.incommingRequestsPage.data = this.incommingRequestsPage.data.concat(items);
                }
            });
    }

    public getOutgoingRequests() {
        this.isLoading = true;
        this.outgoingRequestsSubscription = this.requestService.getOutgoingRequests(this.outgoingRequestsPage.pagination)
            .finally(() => {
                this.isLoading = false;
            })
            .subscribe(page => {
                this.outgoingRequestsPage.hasMoreItems = page.hasMoreItems;
                this.outgoingRequestsPage.pagination = page.pagination;

                if (page.data) {
                    const items = page.data as RequestViewModel[];
                    this.outgoingRequestsPage.data = this.outgoingRequestsPage.data.concat(items);
                }
            });
    }

    public acceptIncommingRequest(incommingRequest: RequestViewModel) {
        incommingRequest.isAcceptingIncommingRequest = true;
        this.userService.modifyRelationship(incommingRequest.id, {
            action: RelationshipAction.Approve
        }).finally(() => {
            incommingRequest.isAcceptingIncommingRequest = true;
        }).subscribe(userResult => {
            // const indexToRemove = this.incommingRequestsPage.data.findIndex(e => e.id === incommingRequest.id);
            // this.incommingRequestsPage.data.splice(indexToRemove, 1);
            // this.requestService.updateIncommingRequestsCount(this.incommingRequestsPage.data.length);
            incommingRequest.isAccepted = true;
        });
    }

    public removeIncommingRequest(incommingRequest: RequestViewModel) {
        incommingRequest.isRemovingIncommingRequest = true;
        this.userService.modifyRelationship(incommingRequest.id, {
            action: RelationshipAction.Reject
        }).finally(() => {
            incommingRequest.isRemovingIncommingRequest = false;
        }).subscribe(userResult => {
            // const indexToRemove = this.incommingRequestsPage.data.findIndex(e => e.id === incommingRequest.id);
            // this.incommingRequestsPage.data.splice(indexToRemove, 1);
            // this.requestService.updateIncommingRequestsCount(this.incommingRequestsPage.data.length);
            incommingRequest.isRemoved = true;
        });
    }

    public removeOutgoingRequest(outgoingRequest: RequestViewModel) {
        outgoingRequest.isRemovingIncommingRequest = true;
        this.userService.modifyRelationship(outgoingRequest.id, {
            action: RelationshipAction.Unfollow
        }).finally(() => {
            outgoingRequest.isRemovingIncommingRequest = false;
        }).subscribe(userResult => {
            // const indexToRemove = this.outgoingRequestsPage.data.findIndex(e => e.id === outgoingRequest.id);
            outgoingRequest.isRemoved = true;
        });
    }

    public close() {
        this.onClosing.emit({ ok: true });
    }

    public ngOnInit() {
        if (this.selectedTabIndex) {
            this.getOutgoingRequests();
        } else {
            this.getIncommingRequests();
        }
    }
}
