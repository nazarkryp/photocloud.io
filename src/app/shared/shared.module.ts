import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultImageDirective } from './directives/default-image.directive';
import { ImagePreviewDirective } from 'app/shared/directives/image-preview.directive';
import { EditMediaService, LikeService } from 'app/shared/services';
import { ScrollDirective } from './directives/scroll.directive';
import { AutoFocusDirective } from './directives/autofocus.directive';
import { HeaderScrollDirective } from './directives/header-scroll.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        EditMediaService,
        LikeService
    ],
    declarations: [
        DefaultImageDirective,
        ImagePreviewDirective,
        ScrollDirective,
        AutoFocusDirective,
        HeaderScrollDirective
    ],
    exports: [
        DefaultImageDirective,
        ImagePreviewDirective,
        ScrollDirective,
        HeaderScrollDirective,
        AutoFocusDirective,
        CommonModule
    ]
})
export class SharedModule { }
