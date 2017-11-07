import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { AccountService } from '../services/account.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class SigninComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
