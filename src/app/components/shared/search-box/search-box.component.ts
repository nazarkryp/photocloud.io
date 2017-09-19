import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MdAutocompleteSelectedEvent } from '@angular/material';

import { Observable } from 'rxjs/Rx';

import { UserService } from '../../../services';
import { Collection, User } from '../../../common/models';

@Component({
    selector: 'app-search-box',
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
    private searchControl: FormControl;
    private users: Observable<User[]>;
    private isSearching: boolean;
    private searchQuery: string;

    constructor(
        private router: Router,
        private userService: UserService) {
    }

    private searchUsers(searchQuery: string) {
        return this.userService.searchUsers(searchQuery)
            .map(collection => collection.data);
    }

    private onSelectionChanged(event: MdAutocompleteSelectedEvent) {
        if (event.option.value) {
            this.router.navigateByUrl(`/${event.option.value}`)
                .then((navigationSuccess) => {
                    if (navigationSuccess) {
                        this.searchControl.setValue('')
                    }
                });
        }
    }

    private clear() {
        this.searchQuery = '';
    }

    public ngOnInit() {
        this.searchControl = new FormControl();
        this.users = this.searchControl.valueChanges
            .do(_ => this.isSearching = true)
            .switchMap((searchQuery) =>
                searchQuery ? this.searchUsers(searchQuery) : Observable.of(null))
            .do(_ => this.isSearching = false);
    }
}
