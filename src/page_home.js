import { LitElement, html } from 'lit';
import { styles } from './material-components-web.min.css.js';
import { globalProp } from './globalProp.js';

class Home extends LitElement {
  static styles = styles;

  constructor() {
    super();
    console.log('Home constructor: globalProp = ' + globalProp);
    console.log('Home constructor: appProp = ' + document.querySelector('app-root').appProp);

    this.menu = null;
  }

  // getTodos1() {
  //   fetch('/api/todos', {
  //     method: 'GET',
  //     // headers: {
  //     //   'Content-Type': 'application/json',
  //     // },
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       const todoListEl = this.shadowRoot.querySelector('#todo-list');
  //       todoListEl.innerHTML = '';
  //       for (let i = 0; i < data.length; i++) {
  //         const todoEl = document.createElement('div');
  //         todoEl.innerHTML = `<div style="padding-left: 30px;">` +
  //           `<p>• ${data[i].name}</p>` +
  //           `<p>${data[i].status}</p>` +
  //           `<p>${JSON.stringify(data[i].user)}</p>` +
  //           `</div>`;
  //         todoListEl.appendChild(todoEl);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // }

  async getTodos() {
    try {
      const response = await fetch('/api/todos', {
        method: 'GET',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
      });
      const data = await response.json();

      const todoListEl = this.shadowRoot.querySelector('#todo-list');
      todoListEl.innerHTML = '';
      for (let i = 0; i < data.length; i++) {
        const todoEl = document.createElement('div');
        todoEl.innerHTML =
          `
          <div>
            <p>${data[i].name}</p> 
            <div style="padding-left: 30px;" 
              <p>${data[i].status}</p> 
              <p>${JSON.stringify(data[i].user)}</p> 
            </div> 
          </div>
          `.trim();
        todoListEl.appendChild(todoEl);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }


  render() {
    // If provided, the properties for type and day are taking from the path.
    //const { type = 'NASDAC', day = 'monday' } = this.routeProps;
    return html`
      <div class="wrapper">
        This is the page for Home ${this.routeProps}
        <br>
        <a href="/">Home</a>
        <a href="/stocks">Stocks</a>
        <a href="/trade/123">Trade</a>
        <a href="/news/tech">News</a>
        <br>
        <br>
        <button @click=${() => window.location = '/stocks'}>Go to stocks</button>
        <br>
        <button @click=${() => this.logout()}>Log Out</button>
        <br>
        <button @click=${() => this.openLogoutMenu()} id="btn-logout" class="mdc-button mdc-button--outlined smaller-text">
          <div class="mdc-button__ripple"></div>
          <span class="mdc-button__label">Log Out</span>
        </button>
        <br>
        <br>
        <button @click=${() => this.getTodos()} id="btn-send-item" class="mdc-button mdc-button--outlined smaller-text">
          <div class="mdc-button__ripple"></div>
          <span class="mdc-button__label">Get Todos</span>
        </button>
        <br>
        <div id="todo-list"></div>
        <br>
        <label class="mdc-text-field mdc-text-field--filled">
          <span class="mdc-text-field__ripple"></span>
          <span class="mdc-floating-label" id="hint-email-address">Email Address</span>
          <input id="ti-email-address" class="mdc-text-field__input" type="email" aria-labelledby="my-label-id">
          <span class="mdc-line-ripple"></span>
        </label>
        <br>
        <div class="mdc-menu mdc-menu-surface" id="menu-logout">
          <ul class="mdc-deprecated-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabindex="-1">
            <li id="menu-item-logout-confirm" class="mdc-deprecated-list-item" role="menuitem">
              <span class="mdc-deprecated-list-item__ripple"></span>
              <span class="mdc-deprecated-list-item__text">Log Out</span>
            </li>
            <li id="menu-item-logout-cancel" class="mdc-deprecated-list-item" role="menuitem">
              <span class="mdc-deprecated-list-item__ripple"></span>
              <span class="mdc-deprecated-list-item__text">Cancel</span>
            </li>
          </ul>
        </div>
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

    const menuEl = this.shadowRoot.querySelector('#menu-logout');
    this.menu = new mdc.menu.MDCMenu(menuEl);
    this.menu.setAnchorElement(this.shadowRoot.querySelector('#btn-logout'));
    menuEl.addEventListener('MDCMenu:selected', this.handleSelected_Menu_Logout.bind(this));
    menuEl.addEventListener('MDCMenuSurface:closed', this.handleCancel_Menu_Logout.bind(this));
  }

  logout() {
    localStorage.removeItem('token');
    window.location = '/';
  }

  openLogoutMenu() {
    this.menu.open = true;
  }

  handleSelected_Menu_Logout(e) {
    console.log('handleSelected_Menu_Logout', e.detail);
    if (e.detail.item.id === 'menu-item-logout-confirm') {
      this.logout();
    }
  }

  handleCancel_Menu_Logout(e) {
    console.log('handleCancel_Menu_Logout', e.detail);
  }
}
customElements.define('page-home', Home);