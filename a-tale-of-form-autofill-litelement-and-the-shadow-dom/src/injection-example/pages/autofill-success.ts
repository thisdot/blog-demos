import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('autofill-success')
export class AutofillSuccess extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `,
  ];

  render() {
    return html`
      <p>Success!</p>
      <a href="/">Go Home</a>
    `;
  }
}
