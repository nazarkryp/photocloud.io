import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Rx';

import { UserService } from '../../../services';
import { Collection, User } from '../../../common/models';

@Component({
    selector: 'app-search-box',
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
    private usersControl: FormControl;
    private users: Observable<User[]>;
    private searchQuery: string;

    constructor(
        private userService: UserService) {
            this.usersControl = new FormControl();
        }

    private searchUsers() {
        this.users = this.userService.searchUsers(this.searchQuery)
            .map(collection => {
                return collection.data;
            });
    }

    ngOnInit() {
        // this.searchUsers();
    }
}
