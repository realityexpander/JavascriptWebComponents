import { LitElement, html } from 'lit';

class Login2 extends LitElement {

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
  }

  render() {
    // If provided, the properties for type and day are taking from the path.
    return html`
      <h1>Login</h1>
      <p>Please login</p>
      <p>Category: ${this.category}</p>
      <form>
        <label for="username">Username:</label><br>
        <input type="text" id="username" name="username"><br>
        <label for="password">Password:</label><br>
        <input type="password" id="password" name="password"><br><br>
        <input type="submit" value="Submit">
      </form>
      <button @click=${this.login}>Login</button>
      <br>
      <a href="/">Home</a>
      `
  }

  login() {
    console.log('login');
    localStorage.setItem('token', '1234567890');
    window.location.href = '/';

    // fetch('http://localhost:3000/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //    username: 'admin',
    //    password: 'admin'
    //   })
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log('Success:', data);
    // })
  }

}
customElements.define('page-login', Login2);