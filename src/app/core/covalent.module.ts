import { NgModule } from '@angular/core';
import {
    CovalentCommonModule,
    CovalentNotificationsModule,
} from '@covalent/core';
import { CovalentLayoutModule } from '@covalent/core/layout';
import { CovalentStepsModule } from '@covalent/core/steps';

@NgModule({
    imports: [
        CovalentLayoutModule,
        CovalentStepsModule,
        CovalentCommonModule,
        CovalentNotificationsModule,
    ],
    exports: [
        CovalentLayoutModule,
        CovalentStepsModule,
        CovalentCommonModule,
        CovalentNotificationsModule,
    ]
})
export class CovalentModule { }
