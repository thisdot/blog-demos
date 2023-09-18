import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('light-element')
export class LightElement extends LitElement {
  createRenderRoot(): ShadowRoot | this {
    return this;
  }
}
