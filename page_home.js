import { LitElement, html } from 'lit';
import { styles } from './material-components-web.min.css.js';

class Home extends LitElement {
  static styles = styles;

  render() {
    // If provided, the properties for type and day are taking from the path.
    //const { type = 'NASDAC', day = 'monday' } = this.routeProps;
    return html`
      This is the page for Home ${this.routeProps}
      <br>
      <a href="/">Home</a>
      <a href="/stocks">Stocks</a>
      <a href="/trade/123">Trade</a>
      <a href="/news/tech">News</a>

      <br>
      <button @click=${() => window.location = '/stocks'}>Go to stocks</button>
      <br>
      <button @click=${() => this.logout()}>Log Out</button>

      <button id="btn-send-item" class="mdc-button mdc-button--outlined smaller-text">
          <div class="mdc-button__ripple"></div>
          <span class="mdc-button__label">Send Item</span>
      </button>
      `
  }

  firstUpdated() {
    const buttons = this.shadowRoot.querySelectorAll('.mdc-button');
    for (let i = 0, button; button = buttons[i]; i++) {
      mdc.ripple.MDCRipple.attachTo(button);
    }
  }

  logout() {
    localStorage.removeItem('token');
    window.location = '/';
  }
}
customElements.define('page-home', Home);