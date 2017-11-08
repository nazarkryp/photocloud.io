import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { DefaultErrorStateMatcher } from 'app/components/account/matchers';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class CreateComponent implements OnInit {
    public matcher = new DefaultErrorStateMatcher();
    public formGroup: FormGroup;

    constructor(private builder: FormBuilder) {
        this.formGroup = this.builder.group({
            username: new FormControl('', )
        });
    }

    public createAccount() {
        console.log('OK');
    }

    ngOnInit() {
    }

}
