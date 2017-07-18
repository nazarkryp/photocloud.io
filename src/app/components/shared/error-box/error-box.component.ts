import { Component, OnInit, Input } from '@angular/core';

import { Error } from '../../../common/models';

@Component({
  selector: 'app-error-box',
  templateUrl: './error-box.component.html',
  styleUrls: ['./error-box.component.css']
})
export class ErrorBoxComponent implements OnInit {
  @Input() public error: Error = new Error();

  constructor() { }

  ngOnInit() {
  }

}
