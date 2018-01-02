import { NgModule } from '@angular/core';
import {
    CovalentNotificationsModule,
    CovalentStepsModule,
    CovalentLayoutModule,
    CovalentCommonModule,
    CovalentDialogsModule
} from '@covalent/core';

@NgModule({
    imports: [
        CovalentCommonModule,
        CovalentLayoutModule,
        CovalentStepsModule,
        CovalentNotificationsModule,
        CovalentDialogsModule
    ],
    exports: [
        CovalentCommonModule,
        CovalentLayoutModule,
        CovalentStepsModule,
        CovalentNotificationsModule,
        CovalentDialogsModule
    ]
})
export class CovalentModule { }
