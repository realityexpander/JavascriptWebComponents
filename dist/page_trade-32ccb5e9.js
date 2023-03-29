import { s, x } from './app.js';

class Trade extends s {
  render() {
    // If provided, the properties for type and day are taking from the path.
    return x`
      This is the page for trades ${this.stockId} 
      ${this.againstRate == undefined ? 'No rate given' : 'against rate: ' + this.againstRate}
    `
  }
}
customElements.define('page-trade', Trade);
