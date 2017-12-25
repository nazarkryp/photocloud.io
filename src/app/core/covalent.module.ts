import { NgModule } from '@angular/core';
import {
    CovalentNotificationsModule,
    CovalentStepsModule,
    CovalentLayoutModule,
    CovalentCommonModule
} from '@covalent/core';

@NgModule({
    imports: [
        CovalentCommonModule,
        CovalentLayoutModule,
        CovalentStepsModule,
        CovalentNotificationsModule
    ],
    exports: [
        CovalentCommonModule,
        CovalentLayoutModule,
        CovalentStepsModule,
        CovalentNotificationsModule
    ]
})
export class CovalentModule { }
