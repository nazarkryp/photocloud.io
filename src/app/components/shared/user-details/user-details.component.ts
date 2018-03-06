import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { CurrentUserService } from 'app/infrastructure/services';
import { CurrentUserViewModel, AttachmentViewModel, UserViewModel, PageViewModel } from 'app/models/view';
import { RelationshipStatus } from 'app/models/shared';
import { UserService, UploaderService, } from 'app/services';
import { UsersDialogComponent } from 'app/components/shared/users-dialog/users-dialog.component';

import { FileUploader } from 'ng2-file-upload';
import { UserDialogDetails } from 'app/components/shared/users-dialog/models';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnDestroy {
    private currentUserSubscription: Subscription;

    @Input() public user: UserViewModel;
    public currentUser: CurrentUserViewModel;
    public uploader: FileUploader;
    public isModifyingRelationship: boolean;
    public truncateWidth: number;

    constructor(
        private router: Router,
        private dialog: MatDialog,
        private uploaderService: UploaderService,
        private currentUserService: CurrentUserService,
        private userService: UserService) {
        this.truncateWidth = this.defaultTruncateWidth;
        this.uploader = uploaderService.createUploader((attachment) => this.onSuccessUpload(attachment));
        this.currentUserSubscription = this.currentUserService.getCurrentUser()
            .subscribe(currentUser => {
                this.currentUser = currentUser;
            });
    }

    public get defaultTruncateWidth(): number {
        return 60;
    }

    public increaseTruncateSize() {
        this.truncateWidth = 10000;
    }

    private onSuccessUpload(attachment: AttachmentViewModel) {
        this.currentUserService.changeAccountAttachment({
            pictureId: attachment.id
        }).subscribe(user => {
            this.user.pictureUri = user.pictureUri
        });
    }

    public getFollowers() {
        const userId = this.user.id;
        this.openDialog(this.userService.getFollowers.bind(this.userService), this.user.id, 'Followers')
            .afterClosed().subscribe((page: PageViewModel<UserViewModel>) => {
                if (page && !page.hasMoreItems && this.user.id === userId && this.currentUser.id === this.user.id) {
                    this.user.counters.followers = page.data.length;
                }
            });
    }

    public getFollowings() {
        const userId = this.user.id;
        this.openDialog(this.userService.getFollowings.bind(this.userService), this.user.id, 'Following')
            .afterClosed().subscribe((page: PageViewModel<UserViewModel>) => {
                if (page && !page.hasMoreItems && this.user.id === userId && this.currentUser.id === this.user.id) {
                    this.user.counters.following = page.data.filter(e => e.relationship.outgoingStatus === RelationshipStatus.Following).length;
                }
            });
    }

    public modifyRelationship() {
        const action = this.getRelationshipAction(this.user.relationship.outgoingStatus);
        this.isModifyingRelationship = true;
        this.userService.modifyRelationship(this.user.id, {
            action: action
        }).finally(() => {
            this.isModifyingRelationship = false;
        }).subscribe((user: UserViewModel) => {
            if (user.relationship.outgoingStatus === RelationshipStatus.Following) {
                this.user.counters.followers++;
            } else if (user.relationship.outgoingStatus === RelationshipStatus.None && this.user.relationship.outgoingStatus !== RelationshipStatus.Requested) {
                this.user.counters.followers--;
            }

            this.user.relationship = user.relationship;
        });
    }

    public getRelationshipAction(outgoingStatus: RelationshipStatus): number {
        if (outgoingStatus === RelationshipStatus.Following) {
            return 1;
        } else if (outgoingStatus === RelationshipStatus.Requested) {
            return 1;
        } else if (outgoingStatus === RelationshipStatus.Blocked) {
            return 4;
        }

        return 0;
    }

    public logout() {
        this.currentUserService.signOut();
        this.router.navigateByUrl('/account/signin');
    }

    public ngOnDestroy(): void {
        if (this.currentUserSubscription) {
            this.currentUserSubscription.unsubscribe();
        }

        this.uploader.destroy();
    }

    private openDialog(handler: (userId: number) => Observable<PageViewModel<UserViewModel>>, userId: number, title: string, counterToUpdate: number = null)
        : MatDialogRef<UsersDialogComponent, PageViewModel<UserViewModel>> {
        const details = new UserDialogDetails(title, handler, userId);
        return this.dialog.open(UsersDialogComponent, {
            width: '500px',
            height: '600px',
            data: details
        });
    }
}
