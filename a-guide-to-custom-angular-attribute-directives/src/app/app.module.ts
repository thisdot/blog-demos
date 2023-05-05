import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ClickAwayDirective } from './click-away.directive';
import { DialogComponent } from './dialog/dialog.component';
import { DragDropDirective } from './drag-drop.directive';

@NgModule({
  declarations: [
    AppComponent,
    ClickAwayDirective,
    DialogComponent,
    DragDropDirective,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
