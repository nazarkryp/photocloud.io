import { NgModule } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { A11yModule } from '@angular/cdk/a11y';
import { MatBadge } from './badge';


@NgModule({
    imports: [
        MatCommonModule,
        A11yModule,
    ],
    exports: [
        MatBadge,
    ],
    declarations: [
        MatBadge,
    ],
})
export class MatBadgeModule { }
