// import { todoStyle } from './shadowStyle.js';

class Todo2Item extends HTMLElement {

  static get todoStyle() {
    return `
    .todo-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.1rem;
      border: 1px solid #ccc;
      border-radius: 0.25rem;
      margin-bottom: 0.2rem;
    }
    .todo-item__text {
      flex: 1;
      margin-right: 0.2rem;
    }
    .todo-item__button {
      padding: 0.15rem 0.1rem;
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
      padding: 0.1rem;
      border: 1px solid #ccc;
      border-radius: 0.25rem;
      margin-bottom: 0.1rem;
    }
    label {
      margin: 0;
      padding: 0;
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
        <input id="checkbox-completed" type="checkbox">
        <span id="display-1" class="todo-item__text">
          <slot></slot> 
        </span>
        <span id="display-2" class="todo-item__text">
          <slot name="description"></slot>
        </span>

        <div hidden id="editors">
          <input id="editors-checkbox" type="checkbox">
          <input type="text" id="editors-todo-title" placeholder="title"/>
          <input type="text" id="editors-todo-description" placeholder="description"/>
          <button class="todo-item__button" id="button-editor-save">Save</button>
          <button class="todo-item__button" id="button-editor-cancel">Cancel</button>
        </div>

        <div>
          <button class="todo-item__button" id="button-delete">Delete</button>
          <button class="todo-item__button" id="button-edit">Edit</button>
        </div>
      </label>
    `;
    shadowRoot.append(template.content.cloneNode(true));

    // Internal Object properties
    this._id = ""
    this._completed = false
    this._description = ""
    this._title = ""

    // State of the component
    this._editMode = false
  }

  connectedCallback() {
    this.shadowRoot.querySelector('#checkbox-completed')?.addEventListener('change', this._onToggle.bind(this));
    this.shadowRoot?.querySelector('#button-delete')?.addEventListener('click', this._onDelete.bind(this));
    this.shadowRoot?.querySelector('#button-edit')?.addEventListener('click', this._onEdit.bind(this));

    this._updateRendering();
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('input').removeEventListener('change', this._onToggle.bind(this));
    this.shadowRoot.querySelector('#button-delete').removeEventListener('click', this._onDelete.bind(this));
    this.shadowRoot.querySelector('#button-edit').removeEventListener('click', this._onEdit.bind(this));
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

  _onEdit() {
    this._editMode = true
    this.shadowRoot.querySelector('#checkbox-completed').hidden = true;
    this.shadowRoot.querySelector('#display-1').hidden = true;
    this.shadowRoot.querySelector('#display-2').hidden = true;

    this.shadowRoot.querySelector('#editors').hidden = false;
    this.shadowRoot.querySelector('#editors-checkbox').checked = this['_completed'];
    this.shadowRoot.querySelector('#editors-todo-title').value = this['_title'];
    this.shadowRoot.querySelector('#editors-todo-description').value = this['_description'];
    this.shadowRoot.querySelector('#editors-todo-title').focus();

    this.shadowRoot.querySelector('#button-editor-save').addEventListener('click', this._onSave.bind(this));
    this.shadowRoot.querySelector('#button-editor-cancel').addEventListener('click', this._onCancel.bind(this));
  }

  _onSave() {
    this._editMode = false
    this.shadowRoot.querySelector('#checkbox-completed').hidden = false;
    this.shadowRoot.querySelector('#display-1').hidden = false;
    this.shadowRoot.querySelector('#display-2').hidden = false;

    this.shadowRoot.querySelector('#editors').hidden = true;

    this.completed = this.shadowRoot.querySelector('#editors-checkbox').checked;
    this.title = this.shadowRoot.querySelector('#editors-todo-title').value;
    this.description = this.shadowRoot.querySelector('#editors-todo-description').value;

    this.dispatchEvent(new CustomEvent('update_todo_item', {
      bubbles: true,
      composed: true,
      detail: {
        id: this.id,
        completed: this.completed,
        title: this.title,
        description: this.description,
      },
    }));
  }

  _onCancel() {
    this._editMode = false
    this.shadowRoot.querySelector('#checkbox-completed').hidden = false;
    this.shadowRoot.querySelector('#display-1').hidden = false;
    this.shadowRoot.querySelector('#display-2').hidden = false;
    this.shadowRoot.querySelector('#editors').hidden = true;
  }

  static observedAttributes = ["title", "description", "completed"];

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[name] = newValue;
      this._updateRendering();
    }
  }

  get id() {
    return this['_id'] ?? "";
  }

  set id(v) {
    this.setAttribute("id", v)
    this['_id'] = v
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
      this.shadowRoot.getElementById('checkbox-completed').checked = true
    } else {
      this.removeAttribute("completed");
      this['_completed'] = false
      this.shadowRoot.getElementById('checkbox-completed').checked = false
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
