import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../services';
import { Collection, User, RelationshipAction, RelationshipStatus } from '../../../common/models';

import { NgProgressService } from 'ngx-progressbar';

@Component({
    selector: 'app-user-search',
    templateUrl: './user-search.component.html',
    styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
    private title = 'Explore People';
    private isLoading: boolean;
    private page: Collection<User> = new Collection<User>();

    constructor(
        private userService: UserService,
        private progressService: NgProgressService) { }

    private getUsers() {
        this.isLoading = true;
        this.progressService.start();

        this.userService.getUsers(this.page.pagination)
            .finally(() => {
                this.progressService.done();
                this.isLoading = false;
            })
            .subscribe((page: Collection<User>) => {
                this.page.hasMoreItems = page.hasMoreItems;
                this.page.pagination = page.pagination;
                if (page.data) {
                    this.page.data = this.page.data.concat(page.data);
                }
            }, () => { });
    }

    public ngOnInit() {
        this.getUsers();
    }
}
