import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('hello-world')
export class HelloWorld extends LitElement {
  render(): unknown {
    return html`<div>Hello World</div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'hello-world': HelloWorld
  }
}
