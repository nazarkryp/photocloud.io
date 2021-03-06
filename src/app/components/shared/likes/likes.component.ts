import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs';

import { UsersDialogComponent } from 'app/components/shared/users-dialog/users-dialog.component';

import { UserViewModel, MediaViewModel } from 'app/models/view';
import { MediaService } from 'app/services';

@Component({
    selector: 'app-likes',
    templateUrl: './likes.component.html',
    styleUrls: ['./likes.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class LikesComponent {
    @Input() public media: MediaViewModel;
    // tslint:disable-next-line:no-output-on-prefix
    @Output() public onClicked = new EventEmitter<Observable<UserViewModel[]>>();

    constructor(
        private dialog: MatDialog,
        private mediaService: MediaService) { }

    public get likes(): string {
        if (this.media.likesCount === 1) {
            const usernames = this.getUserLinks();
            return `${usernames[0]} recently like this`;
        } else if (this.media.likesCount > 1 && this.media.likesCount <= 3) {
            const usernames = this.getUserLinks();
            const joined = usernames.slice(0, -1).join(', ') + ' and ' + usernames.slice(-1);
            return `${joined} recently like this`;
        }

        return `${this.media.likesCount} likes`;
    }

    public openLikesDialog() {
        const likes = this.mediaService.getLikes(this.media.id);
        this.onClicked.next(likes);
        if (this.media.likesCount > 0) {
        }
    }

    private getUserLinks(): string[] {
        return this.media.likes.map(e => {
            return `<a class="like" href="./${e.username}">${e.username}</a>`;
        });
    }
}
