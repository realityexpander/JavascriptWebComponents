import { LitElement, html } from 'lit';

class Trade extends LitElement {
  render() {
    // If provided, the properties for type and day are taking from the path.
    return html`
      This is the page for trades ${this.stockId} 
      ${this.againstRate == undefined ? 'No rate given' : 'against rate: ' + this.againstRate}
    `
  }
}
customElements.define('page-trade', Trade);