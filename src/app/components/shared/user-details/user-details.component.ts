import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, ProgressSpinnerMode } from '@angular/material';

import { Subscription ,  Observable } from 'rxjs';

import { CurrentUserService } from 'app/infrastructure/services';
import { CurrentUserViewModel, AttachmentViewModel, UserViewModel, Page } from 'app/models/view';
import { RelationshipStatus } from 'app/models/shared';
import { UserService, UploaderService, } from 'app/services';
import { UsersDialogComponent } from 'app/components/shared/users-dialog/users-dialog.component';

import { FileUploader } from 'ng2-file-upload';
import { UserDialogDetails } from 'app/components/shared/users-dialog/models';
import { finalize } from 'rxjs/operators';
import { LightboxComponent } from '../lightbox/lightbox.component';
import { PromptService } from 'app/modules/prompt';

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
        private prompt: PromptService,
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

    public get isAuthenticated(): boolean {
        return this.currentUserService.isAuthenticated;
    }

    public get isUploading(): boolean {
        return this.uploader.isUploading && this.uploader.queue && this.uploader.queue.length > 0;
    }

    public get progress(): number {
        return this.uploader.progress;
    }

    public get progressSpinnerMode(): string {
        if (this.uploader.queue.length && (this.uploader.progress < 1 || this.uploader.progress === 100)) {
            return 'indeterminate';
        }

        return 'determinate';
    }

    public get defaultTruncateWidth(): number {
        return 60;
    }

    public increaseTruncateSize() {
        this.truncateWidth = 10000;
    }

    public preview() {
        if (this.user.pictureUri) {
            this.dialog.open(LightboxComponent, {
                height: 'auto',
                width: 'auto',
                maxHeight: 'calc(100vh - 1.4rem)',
                maxWidth: 'calc(100vw - 1.4rem)',
                autoFocus: false,
                panelClass: 'dialog-container',
                backdropClass: 'dialog-backdrop',
                data: {
                    uri: this.user.pictureUri
                }
            });
        }
    }

    public getFollowers() {
        const userId = this.user.id;
        this.openDialog(this.userService.getFollowers.bind(this.userService), this.user.id, 'Followers')
            .afterClosed().subscribe((page: Page<UserViewModel>) => {
                if (page && !page.hasMoreItems && this.user.id === userId) {
                    this.user.counters.followers = page.data.length;
                }
            });
    }

    public getFollowings() {
        const userId = this.user.id;
        this.openDialog(this.userService.getFollowings.bind(this.userService), this.user.id, 'Following')
            .afterClosed().subscribe((page: Page<UserViewModel>) => {
                if (page && !page.hasMoreItems && this.user.id === userId) {
                    if (this.user.id === this.currentUser.id) {
                        this.user.counters.following = page.data.filter(e => e.relationship.outgoingStatus === RelationshipStatus.Following).length;
                    } else {
                        this.user.counters.following = page.data.length;
                    }
                }
            });
    }

    public modifyRelationship() {
        const action = this.getRelationshipAction(this.user.relationship.outgoingStatus);
        this.isModifyingRelationship = true;
        this.userService.modifyRelationship(this.user.id, {
            action: action
        }).pipe(finalize(() => {
            this.isModifyingRelationship = false;
        })).subscribe((user: UserViewModel) => {
            if (this.currentUser.id === user.id && user.relationship.outgoingStatus === RelationshipStatus.Following) {
                this.user.counters.followers++;
            } else if (this.currentUser.id === user.id && user.relationship.outgoingStatus === RelationshipStatus.None && this.user.relationship.outgoingStatus !== RelationshipStatus.Requested) {
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

    private openDialog(handler: (userId: number) => Observable<Page<UserViewModel>>, userId: number, title: string, counterToUpdate: number = null)
        : MatDialogRef<UsersDialogComponent, Page<UserViewModel>> {
        const details = new UserDialogDetails(title, handler, userId);
        return this.dialog.open(UsersDialogComponent, {
            width: '500px',
            height: '600px',
            data: details,
            panelClass: 'dialog-container',
            backdropClass: 'dialog-backdrop'
        });
    }

    private onSuccessUpload(attachment: AttachmentViewModel) {
        this.currentUserService.changeAccountAttachment({
            pictureId: attachment.id
        }).pipe(finalize(() => {
            this.uploader.clearQueue();
        })).subscribe(user => {
            this.user.pictureUri = user.pictureUri;
        });
    }
}
