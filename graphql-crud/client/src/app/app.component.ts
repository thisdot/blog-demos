import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>GraphQL in Angular!</h1>
      <div class="row">
        <div class="col-lg-8">
          <app-book-list (bookSelected)="book = $event"></app-book-list>
        </div>
        <div class="col-lg-4">
          <app-book-create-edit [book]="book"></app-book-create-edit>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  
}
