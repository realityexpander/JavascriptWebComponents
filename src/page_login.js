import { LitElement, html } from 'lit';
import { styles } from './material-components-web.min.css.js';

import './my-element.ts'

import { authConfig } from './globalProp.js';

class Login extends LitElement {

  static styles = styles;

  static get properties() {
    return {
      category: { type: String },
    }
  }

  constructor() {
    super();
    this.category = '';
  }

  firstUpdated() {
    this.setupListeners();
  }

  render() {
    // If provided, the properties for type and day are taking from the path.
    return html`
      <div class="wrapper">
        <h1>Login</h1>
        <p>Please login</p>
        <p>Category: ${this.category}</p>
        <form action="" id="login-form">
        
          <label for="email" class="mdc-text-field mdc-text-field--filled">
            <span class="mdc-text-field__ripple"></span>
            <span class="mdc-floating-label" id="hint-email-address">Email Address</span>
            <input id="email" type="email" class="mdc-text-field__input" aria-labelledby="my-label-id">
            <span class="mdc-line-ripple"></span>
          </label>
          <br>
          <br>
        
          <label for="password" class="mdc-text-field mdc-text-field--filled">
            <span class="mdc-text-field__ripple"></span>
            <span class="mdc-floating-label" id="hint-email-address">Password</span>
            <input id="password" type="password" class="mdc-text-field__input" aria-labelledby="my-label-id">
            <span class="mdc-line-ripple"></span>
          </label>
          <br>
          <br>
          <!-- <button type="submit">Submit</button> must use listeners for this button -->
          <button type="submit" id="btn-submit" class="mdc-button mdc-button--outlined smaller-text">
            <div class="mdc-button__ripple"></div>
            <span class="mdc-button__label">Submit</span>
          </button>
        </form>
        <br>

        <p hidden id="error-message"></p>
        <br>
        <br>

        <button @click=${this.submitLogin} id="btn-login" class="mdc-button mdc-button--outlined smaller-text">
          <div class="mdc-button__ripple"></div>
          <span class="mdc-button__label">Login</span>
        </button>
        <br>
        <br>

        <button @click=${this.register} id="btn-signup" class="mdc-button mdc-button--outlined smaller-text">
          <div class="mdc-button__ripple"></div>
          <span class="mdc-button__label">Signup</span>
        </button>
        <br>
        <br>
        
        <my-element></my-element>
        
        <br>
      </div>
      `
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeListeners();
  }

  setupListeners() {
    this.shadowRoot.getElementById('login-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.login();
    });

    // Setup listeners for all the buttons
    const buttons = this.shadowRoot.querySelectorAll('.mdc-button');
    for (let i = 0, button; button = buttons[i]; i++) {
      mdc.ripple.MDCRipple.attachTo(button);
    }

    // Setup listeners for all the text fields
    const textFields = this.shadowRoot.querySelectorAll('.mdc-text-field');
    for (let i = 0, textField; textField = textFields[i]; i++) {
      mdc.textField.MDCTextField.attachTo(textField);
    }

    // listen for count-changed event
    document.addEventListener('count-changed', (e) => {
      let currentTime = new Date();
      // set the time on the sending source element
      e.detail.source.myString = 'changed' + currentTime;
    });

  }

  // Is this needed? 
  // https://stackoverflow.com/questions/6033821/do-i-need-to-remove-event-listeners-before-removing-elements
  // seems to say yes for older browsers, but not for modern browsers.
  removeListeners() {
    this.shadowRoot.getElementById('login-form').removeEventListener('submit', (e) => { });

    // Remove listeners for all the buttons
    const buttons = this.shadowRoot.querySelectorAll('.mdc-button');
    for (let i = 0, button; button = buttons[i]; i++) {
      mdc.ripple.MDCRipple.detachFrom(button);
    }

    // Remove listeners for all the text fields
    const textFields = this.shadowRoot.querySelectorAll('.mdc-text-field');
    for (let i = 0, textField; textField = textFields[i]; i++) {
      mdc.textField.MDCTextField.detachFrom(textField);
    }
  }

  submitLogin() {
    this.shadowRoot.getElementById('btn-submit').click();
  }

  async login() {
    let email = this.shadowRoot.getElementById('email').value;
    let password = this.shadowRoot.getElementById('password').value;
    let clientIpAddress = authConfig.getClientIpAddress();

    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        clientIpAddress
      })
    })
      .then(response => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json()
      })
      .then(authData => {

        if (authData.error != undefined) {
          alert('Wrong email or password: ' + authData.error);
          throw new Error(authData.error);
        }

        this.saveAuthenticationInfo(authData);

        // redirect to the home page
        window.location.href = '/';
      })
      .catch((error) => {
        console.error('Error:', error);
        this.showErrorMessage('Error: ' + error);
      });
  }

  async register() {
    let email = this.shadowRoot.getElementById('email').value;
    let password = this.shadowRoot.getElementById('password').value;
    let clientIpAddress = authConfig.getClientIpAddress();

    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        clientIpAddress
      })
    })
      .then(response => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json()
      })
      .then(authData => {
        if (authData.error != undefined) {
          alert('Wrong email or password' + authData.error);
          throw new Error(authData.error);
        }

        this.saveAuthenticationInfo(authData);

        // navigate to the home page
        window.location.href = '/';
      })
      .catch((error) => {
        console.error('Error:', error);
        this.showErrorMessage('Error: ' + error);
      });
  }

  saveAuthenticationInfo({ token, jwtToken, clientIpAddress }) {
    authConfig.setClientIpAddress(clientIpAddress);
    authConfig.setAuthenticationToken(token);
    authConfig.setAuthenticationJWT(jwtToken);
    authConfig.setCookies(token);
  }

  showErrorMessage(message) {
    let control = this.shadowRoot.getElementById('error-message');
    control.hidden = false;
    control.innerText = message;
  }

}
customElements.define('page-login', Login);