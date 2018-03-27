import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { Uploader } from './services';
import { WebApiService } from './services/communication';

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        Uploader,
        WebApiService
    ],
    exports: [
        HttpClientModule
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parent: CoreModule) {
        if (parent) {
            throw new Error('Security module is already loaded. Import it only on the root module');
        }
    }
}
