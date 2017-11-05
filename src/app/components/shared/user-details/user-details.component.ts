import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { UserProvider } from 'app/infrastructure/providers';
import { CurrentUser, Error, Attachment, RelationshipStatus, User } from 'app/common/models';
import { UserService, UploaderService, AccountService } from 'app/services';
import { FileUploader } from 'ng2-file-upload';
import { UsersComponent } from 'app/components/shared/users/users.component';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnDestroy {
    private currentUserSubscription$: Subscription;

    @Input() public user;
    public currentUser: CurrentUser;
    public uploader: FileUploader;
    public isModifyingRelationship: boolean;

    constructor(
        private router: Router,
        private dialog: MatDialog,
        private accountService: AccountService,
        private uploaderService: UploaderService,
        private userProvider: UserProvider,
        private userService: UserService) {
        this.uploader = uploaderService.createUploader((attachment) => this.onSuccessUpload(attachment));
        this.currentUserSubscription$ = this.userProvider.getCurrentUserAsObservable()
            .subscribe(currentUser => {
                this.currentUser = currentUser;
            });
    }

    private onSuccessUpload(attachment: Attachment) {
        this.accountService.updateAccount({
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
        }).subscribe((user: User) => {
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
        this.accountService.signOut();
        this.router.navigateByUrl('/signin');
    }

    public ngOnDestroy(): void {
        if (this.currentUserSubscription$) {
            this.currentUserSubscription$.unsubscribe();
        }

        this.uploader.destroy();
    }
}
