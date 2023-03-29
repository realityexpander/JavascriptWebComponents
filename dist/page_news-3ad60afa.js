import { s, x } from './app.js';

class News extends s {

  static get properties() {
    return {
      category: { type: String },
      someOtherGlobalProp: { type: String }
    }
  }

  constructor() {
    super();
    this.category = '';
    this.someOtherGlobalProp = '';
  }

  firstUpdated() {
    console.log(this.category);
    console.log(this.someOtherGlobalProp);
  }

  render() {
    // If provided, the properties for type and day are taking from the path.
    return x`
    <h1>News</h1>
      <p>This is the page for news.</p>
      <p>Category: ${this.category}</p>
      <p>Some other global prop: ${this.someOtherGlobalProp}</p>
      `
  }

}
customElements.define('page-news', News);
