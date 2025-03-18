import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('counter-element')
export class CounterElement extends LitElement {
  @property({ type: Number })
  count = 0

  render(): unknown {
    return html`
      <div>Count is ${this.count}</div>
      <button @click=${() => this.count++}>Increment</button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'counter-element': CounterElement
  }
}
