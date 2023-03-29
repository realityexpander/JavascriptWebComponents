import { LitElement, html } from 'lit';
//import { Router, RouteMixin } from 'simple-wc-router';
import { Router, RouteMixin } from './router/index.js';

// import './pages/page_home';
// import './components';

import './page_home';
// import './page_stocks';
// import './page_login';


const globalProp = "version-1.2.3.3";

class App extends Router(LitElement) {
  static get routes() {
    return [
      // Root path
      {
        path: "/",
        component: "page-home",
        //import: () => import("./page_home.js")
      },
      {
        path: "/stocks",
        component: "page-stocks",
        import: () => import("./page_stocks.js")
      },
      // Using 'type' and 'day' variable.
      {
        path: "/stock/:type/:day",
        component: "page-stocks",
        import: () => import("./page_stocks.js")
      },
      // Using 'stockId' and optionally 'againstRate' variable.
      {
        path: "/trade/:stockId/:?againstRate",
        component: "page-trade",
        import: () => import("./page_trade.js")
      },
      // Using 'category' variable.
      {
        path: "/news/:category",
        render: routeProps => html`
          <page-news 
              .category=${routeProps.category} 
              .someOtherGlobalProp=${globalProp}>
          </page-news>
        `,
        import: () => import("./page_news.js")
      },
      // Login page
      {
        path: "/login",
        //component: "page-login",
        render: routeProps => html`
          <page-login
            .category="hello">
          </page-login>
        `,
        import: () => import("./page_login.js")
      },
      // Fallback for all unmatched routes.  
      {
        path: "*",
        render: () => html`
          <h2> 404 The requested page could not be found</h2>
          <a href="/">Home</a>
        `
      }
    ];
  }

  render() {
    return (localStorage.getItem('token') == null) ?
      html`
          ${this.routeElement}
        `
      : html`
          <app-header>
            <h1 slot="left">... some title goes here ...</h1>
            <nav slot="right">... some navigation goes here ...</nav>
          </app-header - header >
          <main>
              ${this.routeElement}
          </main>
          <app-footer>
              ... some copyright goes here ...
          </app-footer>
        `;
  }
}
customElements.define('my-app', App);