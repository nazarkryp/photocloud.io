import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MdToolbarModule,
  MdButtonModule,
  MdRippleModule,
  MdCardModule,
  MdIconModule,
  MdTooltipModule,
  MdMenuModule
} from '@angular/material';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MdToolbarModule,
    MdButtonModule,
    MdRippleModule,
    MdCardModule,
    MdIconModule,
    MdTooltipModule,
    MdMenuModule
  ],
  exports: [
    MdToolbarModule,
    MdButtonModule,
    MdRippleModule,
    MdCardModule,
    MdIconModule,
    MdTooltipModule,
    MdMenuModule
  ]
})
export class AppMaterialModule { }
