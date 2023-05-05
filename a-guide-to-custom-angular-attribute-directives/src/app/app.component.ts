import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  lastTarget$ = new Subject<string>();

  showDialog$ = new Subject<boolean>();

  showDialog(event: Event) {
    // Workaround: Needed so the click away from showing the dialog doesn't
    // trigger from the same click that created it in the first place.
    event.stopPropagation();

    this.showDialog$.next(true);
  }

  dismissDialog() {
    this.showDialog$.next(false);
  }

  drop(target: Element): void {
    this.lastTarget$.next(target.tagName.toLowerCase());
  }
}
