import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Router } from '@vaadin/router';
import { LightElement, SharedStylesheet } from '../components/light-element.js';

@customElement('autofill-form')
export class AutofillForm extends LightElement {
  static sharedStyles: SharedStylesheet[] = [
    {
      id: 'autofill-form',
      content: css`
        autofill-form {
          display: block;
        }

        .input {
          display: block;
          width: 100%;
          margin: 8px 0;
          height: 32px;
          padding: 4px 8px;
          box-sizing: border-box;
        }

        .button {
          border: 1px solid black;
          background-color: #5367ff;
          color: white;
        }

        .button:hover {
          background-color: #4357ee;
        }

        .button:active {
          background-color: #384bde;
        }
      `,
    },
  ];

  render() {
    return html`
      <p>Submit the form below to save your credentials.</p>

      <form autocomplete="on" @submit="${this.handleSubmit}">
        <input
          class="input"
          type="email"
          autocomplete="email"
          placeholder="Email Address"
        />
        <input
          class="input"
          type="password"
          autocomplete="current-password"
          placeholder="Password"
        />
        <button class="input button" type="submit">Submit</button>
      </form>
    `;
  }

  private handleSubmit(event: Event) {
    event.preventDefault();
    Router.go('/success');
  }
}
