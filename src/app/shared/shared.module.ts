import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultImageDirective } from './directives/default-image.directive';
import { ImagePreviewDirective } from 'app/shared/directives/image-preview.directive';

@NgModule({
    imports: [
        CommonModule
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
