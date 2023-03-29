import { s, x } from './app.js';

class Login2 extends s {

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
    console.log(this.category);
    this.setupListeners();
  }

  render() {
    // If provided, the properties for type and day are taking from the path.
    return x`
      <h1>Login</h1>
      <p>Please login</p>
      <p>Category: ${this.category}</p>
      <form action="" id="login-form">
        <label for="username">Username:</label><br>
        <input type="text" id="username" name="username" placeholder="Enter your Username..."><br>
        <label for="password">Password:</label><br>
        <input type="password" id="password" name="password" placeholder="Enter your Password..."><br><br>
        <button type="submit">Submit</button> <!-- must use listeners for this button -->
      </form>
      <button @click=${this.login}>Login</button>
      <br>
      <a href="/">Home</a>
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
  }

  removeListeners() {
    this.shadowRoot.getElementById('login-form').removeEventListener('submit', (e) => { });
  }

  login() {
    if (this.shadowRoot.getElementById('username').value == 'admin' &&
      this.shadowRoot.getElementById('password').value == 'admin'
    ) {
      localStorage.setItem('token', '1234567890');
      window.location.href = '/';
    } else {
      alert('Wrong username or password');
    }

    // fetch('http://localhost:3000/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     username: 'admin',
    //     password: 'admin'
    //   })
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log('Success:', data);
    //     localStorage.setItem('token', '1234567890');
    //     window.location.href = '/';
    //   })
  }

}
customElements.define('page-login', Login2);
