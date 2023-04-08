import { LitElement, html } from 'lit';
import { styles } from './material-components-web.min.css.js';

class News extends LitElement {

  static get properties() {
    return {
      category: { type: String },
      someOtherGlobalProp: { type: String }
    }
  }

  //static styles = styles;

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
    <style>
      ${styles}

      /* CSS Grid Layout */
      .grid-container {
        width: 600px;
        -webkit-column-count: 3;
        -moz-column-count: 3;
        column-count: 3;
        
        -webkit-column-gap: 15px;
        -moz-column-gap: 15px;
        column-gap: 15px;
      }
      .grid-item {
        display: block;
        /* match gap size */
        margin-bottom: 15px;
      }
    </style>
    <div class="wrapper">
      <h1>News Items of the Day</h1>
      <p>This is the page for news.</p>
      <p>Category: ${this.category}</p>
      <p>Some other global prop: ${this.someOtherGlobalProp}</p>

      <!-- This is the CSS Grid layout -->
      <div class="grid-container">
        <div class="grid-item">
          <img src="https://picsum.photos/200/300" alt="image">
        </div>
        <div class="grid-item">
          <img src="https://picsum.photos/200/400" alt="image">
        </div>
        <div class="grid-item">
          <img src="https://picsum.photos/200/500" alt="image">
        </div>
        <div class="grid-item">
          <img src="https://picsum.photos/200/300" alt="image">
        </div>
        <div class="grid-item">
          <img src="https://picsum.photos/200/600" alt="image">
        </div>
      </div>
    </div>
      `
  }

}
customElements.define('page-news', News);