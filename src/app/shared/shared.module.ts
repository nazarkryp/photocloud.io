import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImagePreviewDirective } from 'app/shared/directives/image-preview.directive';
import { EditMediaService, LikeService, ProgressService } from './services';
import { DefaultImageDirective, InfiniteScrollDirective, ClickStopPropagationDirective, HeaderScrollDirective, AppearDirective, AutoFocusDirective } from './directives';


@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        EditMediaService,
        LikeService,
        ProgressService
    ],
    declarations: [
        DefaultImageDirective,
        ImagePreviewDirective,
        InfiniteScrollDirective,
        AutoFocusDirective,
        ClickStopPropagationDirective,
        HeaderScrollDirective,
        AppearDirective
    ],
    exports: [
        DefaultImageDirective,
        ImagePreviewDirective,
        InfiniteScrollDirective,
        HeaderScrollDirective,
        AutoFocusDirective,
        ClickStopPropagationDirective,
        AppearDirective,
        CommonModule
    ]
})
export class SharedModule { }
