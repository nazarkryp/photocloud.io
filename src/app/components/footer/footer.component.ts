import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AccountService } from 'app/account/services';
import { CurrentUserViewModel } from 'app/models/view';
import { CurrentUserService } from 'app/infrastructure/services';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent {
    public date: Date = new Date();
}
