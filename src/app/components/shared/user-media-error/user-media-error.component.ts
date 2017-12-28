import { Component, OnInit, Input } from '@angular/core';

import { ErrorViewModel } from 'app/models/view';

@Component({
    selector: 'app-user-media-error',
    templateUrl: './user-media-error.component.html',
    styleUrls: ['./user-media-error.component.css']
})
export class ErrorBoxComponent {
    @Input() public error: ErrorViewModel = new ErrorViewModel();
}
