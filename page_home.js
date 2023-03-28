import { LitElement, html } from 'lit';

class Home extends LitElement {
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
      `
  }

  logout() {
    localStorage.removeItem('token');
    window.location = '/';
  }
}
customElements.define('page-home', Home);