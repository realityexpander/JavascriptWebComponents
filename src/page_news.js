import { LitElement, html } from 'lit';
import { styles } from './material-components-web.min.css.js';

class News extends LitElement {

  static get properties() {
    return {
      category: { type: String },
      someOtherGlobalProp: { type: String }
    }
  }

  static styles = styles;

  constructor() {
    super();
    this.category = '';
    this.someOtherGlobalProp = '';
  }

  firstUpdated() {
    // console.log(this.category);
    // console.log(this.someOtherGlobalProp);
  }

  render() {
    // If provided, the properties for type and day are taking from the path.
    return html`
    <div class="wrapper">
      <h1>Newsy Page</h1>
      <p>This is the page for news.</p>
      <p>Category: ${this.category}</p>
      <p>Some other global prop: ${this.someOtherGlobalProp}</p>
    </div>
      `
  }

}
customElements.define('page-news', News);