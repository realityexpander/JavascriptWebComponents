// import { todoStyle } from './shadowStyle.js';

class Todo2Item extends HTMLElement {

  static get todoStyle() {
    return `
    .todo-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 0.25rem;
      margin-bottom: 0.5rem;
    }
    .todo-item__text {
      flex: 1;
      margin-right: 0.5rem;
    }
    .todo-item__button {
      padding: 0.25rem 0.5rem;
      border: 1px solid #ccc;
      border-radius: 0.25rem;
      background-color: #fff;
      cursor: pointer;
    }
    .todo-item__button:hover {
      background-color: #eee;
    }
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 0.25rem;
      margin-bottom: 0.5rem;
    }
  `
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        ${todoStyle}
        .completed {
          text-decoration: line-through;
        }
      </style>

      <label class="item">
        <input id="checkbox-1" type="checkbox">
        <slot></slot> 
        :
        <span class="todo-item__text">
          <slot name="description"></slot>
        </span>
        <button class="todo-item__button">Delete</button>
        <button class="todo-item__button">Edit</button>
        <button class="todo-item__button">Save</button>
      </label>
    `;
    shadowRoot.append(template.content.cloneNode(true));

    this._completed = false
    this._description = ""
    this._title = ""
  }

  connectedCallback() {
    this.shadowRoot.querySelector('input')?.addEventListener('change', this._onToggle.bind(this));
    this.shadowRoot?.querySelector('button')?.addEventListener('click', this._onDelete.bind(this));

    this._updateRendering();
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('input').removeEventListener('change', this._onToggle.bind(this));
    this.shadowRoot.querySelector('button').removeEventListener('click', this._onDelete.bind(this));
  }

  _onToggle() {
    this.dispatchEvent(new CustomEvent('toggle', {
      bubbles: true,
      composed: true,
      detail: "composed",
    }));
  }

  _onDelete() {
    this.dispatchEvent(new CustomEvent('delete', {
      bubbles: true,
      composed: true,
      detail: "composed",
    }));
  }

  static observedAttributes = ["title", "description", "completed"];

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[name] = newValue;
      this._updateRendering();
    }
  }

  get title() {
    return this['_title'] ?? "";
  }
  set title(v) {
    this.setAttribute("title", v);
    this['_title'] = v
  }

  get description() {
    return this['_description'] ?? "";
  }
  set description(v) {
    this.setAttribute("description", v);
    this['_description'] = v
  }

  get completed() {
    return this['_completed'];
  }
  set completed(v) {
    if (v == "true") {
      this.setAttribute("completed", "");
      this['_completed'] = true
      this.shadowRoot.getElementById('checkbox-1').checked = true
    } else {
      this.removeAttribute("completed");
      this['_completed'] = false
      this.shadowRoot.getElementById('checkbox-1').checked = false
    }
  }

  _updateRendering() {
    // this.shadowRoot.querySelector('input').checked = this['_completed'];
    this.shadowRoot.querySelector('input').checked = this['_completed'] ? true : false;
    // this.shadowRoot.querySelector('input').checked = (Math.random() > 0.5) ? false : true;
    this.shadowRoot.querySelector('slot').textContent = this['_title'];
    // this.shadowRoot.querySelector('slot').classList = this['_completed'] ? 'completed' : '';
    this.shadowRoot.querySelector('slot[name="description"]').textContent = this['_description'];
    this.classList.toggle('completed', this['_completed']);
  }

}
customElements.define('todo2-item', Todo2Item);
