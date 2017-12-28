import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { CurrentUserService } from 'app/infrastructure/services';
import { CurrentUserViewModel, AttachmentViewModel, UserViewModel } from 'app/models/view';
import { RelationshipStatus } from 'app/models/shared';
import { UserService, UploaderService, } from 'app/services';
import { UsersComponent } from 'app/components/shared/users/users.component';

import { FileUploader } from 'ng2-file-upload';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnDestroy {
    private currentUserSubscription: Subscription;

    @Input() public user;
    public currentUser: CurrentUserViewModel;
    public uploader: FileUploader;
    public isModifyingRelationship: boolean;

    constructor(
        private router: Router,
        private dialog: MatDialog,
        private uploaderService: UploaderService,
        private currentUserService: CurrentUserService,
        private userService: UserService) {
        this.uploader = uploaderService.createUploader((attachment) => this.onSuccessUpload(attachment));
        this.currentUserSubscription = this.currentUserService.getCurrentUser()
            .subscribe(currentUser => {
                this.currentUser = currentUser;
            });
    }

    private onSuccessUpload(attachment: AttachmentViewModel) {
        this.currentUserService.updateCurrentUser({
            pictureId: attachment.id
        }).subscribe(user => {
            this.user.pictureUri = user.pictureUri
        });
    }

    public getFollowers() {
        const usersObservable = this.userService.getFollowers(this.user.id);
        this.dialog.open(UsersComponent, {
            data: {
                usersObservable: usersObservable,
                title: 'Followers'
            }
        });
    }

    public getFollowings() {
        const usersObservable = this.userService.getFollowings(this.user.id);
        this.dialog.open(UsersComponent, {
            data: {
                usersObservable: usersObservable,
                title: 'Following'
            }
        });
    }

    public modifyRelationship() {
        const action = this.getRelationshipAction(this.user.incommingStatus);
        this.isModifyingRelationship = true;
        this.userService.modifyRelationship(this.user.id, {
            action: action
        }).finally(() => {
            this.isModifyingRelationship = false;
        }).subscribe((user: UserViewModel) => {
            this.user = user;
        });
    }

    public getRelationshipAction(incommingStatus: RelationshipStatus): number {
        if (incommingStatus === RelationshipStatus.Following) {
            return 1;
        } else if (incommingStatus === RelationshipStatus.Requested) {
            return 1;
        } else if (incommingStatus === RelationshipStatus.Blocked) {
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
}
