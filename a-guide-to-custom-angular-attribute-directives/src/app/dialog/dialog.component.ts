import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  @Output() dismiss = new EventEmitter();

  clickAway(event: PointerEvent): void {
    this.dismiss.emit();
  }
}
