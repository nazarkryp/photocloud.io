import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultImageDirective } from './directives/default-image.directive';
import { ImagePreviewDirective } from 'app/shared/directives/image-preview.directive';
import { EditMediaService } from 'app/shared/services';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        EditMediaService
    ],
    declarations: [
        DefaultImageDirective,
        ImagePreviewDirective
    ],
    exports: [
        DefaultImageDirective,
        ImagePreviewDirective,
        CommonModule
    ]
})
export class SharedModule { }
