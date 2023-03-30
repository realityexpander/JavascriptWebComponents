import { LitElement, html } from 'lit';
import { styles } from './material-components-web.min.css.js';

class Home extends LitElement {
  static styles = styles;

  render() {
    // If provided, the properties for type and day are taking from the path.
    //const { type = 'NASDAC', day = 'monday' } = this.routeProps;
    return html`
      <div style="padding:10px;">
        This is the page for Home ${this.routeProps}
        <br>
        <a href="/">Home</a>
        <a href="/stocks">Stocks</a>
        <a href="/trade/123">Trade</a>
        <a href="/news/tech">News</a>
      
        <br>
        <button @click=${()=> window.location = '/stocks'}>Go to stocks</button>
        <br>
        <button @click=${()=> this.logout()}>Log Out</button>
        <br>
        <br>
        <button id="btn-send-item" class="mdc-button mdc-button--outlined smaller-text">
          <div class="mdc-button__ripple"></div>
          <span class="mdc-button__label">Send Item</span>
        </button>
        <br>
        <br>
        <label class="mdc-text-field mdc-text-field--filled">
          <span class="mdc-text-field__ripple"></span>
          <span class="mdc-floating-label" id="hint-email-address">Email Address</span>
          <input id="ti-email-address" class="mdc-text-field__input" type="email" aria-labelledby="my-label-id">
          <span class="mdc-line-ripple"></span>
        </label>
        <br>
        <br>
      </div>
      `
  }

  firstUpdated() {
    const buttons = this.shadowRoot.querySelectorAll('.mdc-button');
    for (let i = 0, button; button = buttons[i]; i++) {
      mdc.ripple.MDCRipple.attachTo(button);
    }

    /////////////////////////////////////////////////////////////
    // listen for text changes to Email Address
    const emailAddressEl = this.shadowRoot.querySelector('#ti-email-address');
    const emailAddress = mdc.textField.MDCTextField.attachTo(this.shadowRoot.querySelector('.mdc-text-field--filled'));
    // emailAddressEl.addEventListener('input', (e) => {
    //   document.querySelector('#ti-text-area').textContent = e.target.value;
    //   state.email = e.target.value;
    // });
    emailAddress.foundation.adapter.registerInputInteractionHandler('input', (e) => {
      document.querySelector('#ti-text-area').textContent = e.target.value;
      state.email = e.data;
    });

  }

  logout() {
    localStorage.removeItem('token');
    window.location = '/';
  }
}
customElements.define('page-home', Home);