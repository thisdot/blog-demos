import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import randomstring from 'randomstring';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss'],
})
export class GeneratorComponent {
  code$ = new BehaviorSubject<string>(this.generateCode());

  generateCodeClick(event: MouseEvent) {
    this.code$.next(this.generateCode());
  }

  private generateCode(): string {
    return randomstring.generate({ length: 12, charset: 'alphabetic' });
  }
}
