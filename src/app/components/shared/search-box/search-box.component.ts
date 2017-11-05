import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatAutocompleteSelectedEvent } from '@angular/material';

import { Observable } from 'rxjs/Rx';

import { UserService } from '../../../services';
import { Collection, User } from '../../../common/models';

@Component({
    selector: 'app-search-box',
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
    public searchControl: FormControl;
    public users: Observable<User[]>;
    public isSearching: boolean;
    public searchQuery: string;

    constructor(
        private router: Router,
        private userService: UserService) {
    }

    public searchUsers(searchQuery: string) {
        return this.userService.searchUsers(searchQuery)
            .map(collection => collection.data);
    }

    public onSelectionChanged(event: MatAutocompleteSelectedEvent) {
        if (event.option.value) {
            this.router.navigateByUrl(`/${event.option.value}`)
                .then((navigationSuccess) => {
                    if (navigationSuccess) {
                        this.searchControl.setValue('')
                    }
                });
        }
    }

    public clear() {
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
