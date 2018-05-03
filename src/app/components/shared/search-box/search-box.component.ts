import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatAutocompleteSelectedEvent } from '@angular/material';

import { Observable, of } from 'rxjs';

import { UserService } from 'app/services';
import { Page, UserViewModel } from 'app/models/view';

import { NgProgress } from 'ngx-progressbar';
import { map, tap, switchMap, debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-search-box',
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
    public searchControl: FormControl;
    public users: Observable<UserViewModel[]>;
    public isSearching: boolean;
    public searchQuery: string;
    @Input() public scrolled;

    constructor(
        private router: Router,
        private progress: NgProgress,
        private userService: UserService) {
    }

    public searchUsers(searchQuery: string) {
        return this.userService.searchUsers(searchQuery)
            .pipe(map(collection => collection.data));
    }

    public onSelectionChanged(event: MatAutocompleteSelectedEvent) {
        if (event.option.value) {
            this.router.navigateByUrl(`/${event.option.value}`)
                .then((navigationSuccess) => {
                    if (navigationSuccess) {
                        this.searchControl.setValue('');
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
            .pipe(
                debounceTime(300),
                tap(_ => {
                    if (this.searchQuery) {
                        this.progress.start();
                        this.isSearching = true;
                    }
                }),
                switchMap((searchQuery) =>
                    searchQuery ? this.searchUsers(searchQuery) : of(null)),
                tap(_ => {
                    this.progress.done();
                    this.isSearching = false;
                })
            );
    }
}
