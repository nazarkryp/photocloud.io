import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

import { UserViewModel, MediaViewModel } from 'app/models/view';

@Component({
    selector: 'app-likes',
    templateUrl: './likes.component.html',
    styleUrls: ['./likes.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class LikesComponent {
    @Input() public media: MediaViewModel;

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

    private getUserLinks(): string[] {
        return this.media.likes.map(e => {
            return `<a class="like" href="./${e.username}">${e.username}</a>`
        });
    }
}
