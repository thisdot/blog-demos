import { CSSResult, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { injectSharedStylesheet } from './style-injector.js';

export interface SharedStylesheet {
  id: string;
  content: CSSResult;
}

@customElement('light-element')
export class LightElement extends LitElement {
  static sharedStyles: SharedStylesheet[] = [];

  connectedCallback() {
    const { sharedStyles } = this.constructor as any;
    if (sharedStyles) {
      sharedStyles.forEach((stylesheet: SharedStylesheet) => {
        injectSharedStylesheet(
          this,
          stylesheet.id,
          stylesheet.content.toString()
        );
      });
    }

    super.connectedCallback();
  }

  createRenderRoot(): ShadowRoot | this {
    return this;
  }
}
