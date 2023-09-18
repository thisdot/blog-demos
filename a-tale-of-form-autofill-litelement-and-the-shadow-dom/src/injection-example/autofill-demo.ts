import { html, css } from 'lit';
import { property, customElement, query } from 'lit/decorators.js';
import { LightElement, SharedStylesheet } from './components/light-element.js';
import { router } from './router.js';

@customElement('autofill-demo')
export class AutofillDemo extends LightElement {
  @property({ type: String }) header = 'Form Autofill Demo';

  @query('#outlet', true) private outlet!: HTMLDivElement;

  static sharedStyles: SharedStylesheet[] = [
    {
      id: 'autofill-demo',
      content: css`
        autofill-demo {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          font-size: calc(10px + 2vmin);
          color: #1a2b42;
          max-width: 960px;
          margin: 0 auto;
          text-align: center;
          background-color: var(--autofill-demo-background-color);
        }

        .app-body {
          flex-grow: 1;
        }

        .app-footer {
          font-size: calc(12px + 0.5vmin);
          align-items: center;
        }
      `,
    },
  ];

  firstUpdated() {
    router.setOutlet(this.outlet);
  }

  render() {
    return html`
      <main class="app-body">
        <h1>${this.header}</h1>

        <div id="outlet"></div>
      </main>

      <p class="app-footer">
        ❤️ Made with love by
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/thisdot"
          >This Dot</a
        >.
      </p>
    `;
  }
}
