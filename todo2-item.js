// import { todoStyle } from './shadowStyle.js';

class Todo2Item extends HTMLElement {

  static get todoStyle() {
    return `
    .todo-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      border: 1px solid #ccc;
      border-radius: 0.25rem;
      margin-bottom: 1.5rem;
    }
    .todo-item__text {
      flex: 1;
      margin-right: 0.5rem;
    }
    .todo-item__button {
      padding: 0.45rem 1.0rem;
      margin: 0.25rem;
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
      border-radius: 0.35rem;
      margin-bottom: 0.4rem;
    }
    label {
      margin: 1rem;
      padding: 1rem;
    }
    
  `
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        ${Todo2Item.todoStyle}
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
          <input type="checkbox" id="editors-checkbox" >
          <input type="text" id="editors-todo-title" placeholder="title"/>
          <input type="text" id="editors-todo-description" placeholder="description"/>
          <button class="todo-item__button" id="button-editor-save">Save</button>
          <button class="todo-item__button" id="button-editor-cancel">Cancel</button>
        </div>

        <div id="editors-buttons">
          <button class="todo-item__button" id="button-delete">Delete</button>
          <button class="todo-item__button" id="button-edit">Edit</button>
        </div>

        <div id="confirm-delete" hidden>
          <p>Are you sure you want to delete this item?</p>
          <button class="todo-item__button" id="button-yes-delete">Yes</button>
          <button class="todo-item__button" id="button-cancel-delete">No</button>
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
    this._UiState = "edit" // could also be: "confirm-delete"
  }

  connectedCallback() {
    this.shadowRoot.querySelector('#checkbox-completed')?.addEventListener('change', this._onToggleCompleted.bind(this));
    this.shadowRoot?.querySelector('#button-delete')?.addEventListener('click', this._onConfirmDelete.bind(this));
    this.shadowRoot?.querySelector('#button-edit')?.addEventListener('click', this._onEdit.bind(this));

    this._updateUIFromState();
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('#checkbox-completed').removeEventListener('change', this._onToggleCompleted.bind(this));
    this.shadowRoot.querySelector('#button-delete').removeEventListener('click', this._onConfirmDelete.bind(this));
    this.shadowRoot.querySelector('#button-edit').removeEventListener('click', this._onEdit.bind(this));
  }

  _onToggleCompleted() {
    this.dispatchEvent(new CustomEvent('toggle-todo-item', {
      bubbles: true,
      composed: true,
      detail: {
        id: this.getAttribute("id"),
        completed: this._completed,
        title: this._title,
        description: this._description,  
      },
    }));
  }

  _onConfirmDelete() {
    this._UiState = "confirm-delete"
    this.shadowRoot.querySelector('#editors-buttons').hidden = true;
    this.shadowRoot.querySelector('#confirm-delete').hidden = false;

    this.shadowRoot.querySelector('#button-yes-delete').addEventListener('click', this._onDeleteTodoItem.bind(this));
    this.shadowRoot.querySelector('#button-cancel-delete').addEventListener('click', this._onConfirmDelete_Cancel.bind(this));
  }
  
  _onConfirmDelete_Cancel() {
    this._UiState = ""
    this.shadowRoot.querySelector('#editors-buttons').hidden = false;
    this.shadowRoot.querySelector('#confirm-delete').hidden = true;
    
    this._removeConfirmDeleteListeners();
  }
  
  _onConfirmDelete_OK() {
    this._UiState = ""
    this.shadowRoot.querySelector('#editors-buttons').hidden = false;
    this.shadowRoot.querySelector('#confirm-delete').hidden = true;
    
    this._removeConfirmDeleteListeners();
    this._onDeleteTodoItem()
  }
  
  _removeConfirmDeleteListeners() {
    this.shadowRoot.querySelector('#button-yes-delete').removeEventListener('click', this._onDeleteTodoItem.bind(this));
    this.shadowRoot.querySelector('#button-cancel-delete').removeEventListener('click', this._onConfirmDelete_Cancel.bind(this));
  }
  
  _onDeleteTodoItem() {
    this.dispatchEvent(new CustomEvent('delete-todo-item', {
      bubbles: true,
      composed: true,
      detail: "composed",
    }));
  }

  _onEdit() {
    this._UiState = "edit"
    this.shadowRoot.querySelector('#checkbox-completed').hidden = true;
    this.shadowRoot.querySelector('#display-1').hidden = true;
    this.shadowRoot.querySelector('#display-2').hidden = true;
    this.shadowRoot.querySelector('#editors-buttons').hidden = true;

    this.shadowRoot.querySelector('#editors').hidden = false;
    this.shadowRoot.querySelector('#editors-checkbox').checked = this['_completed'];
    this.shadowRoot.querySelector('#editors-todo-title').value = this['_title'];
    this.shadowRoot.querySelector('#editors-todo-description').value = this['_description'];
    this.shadowRoot.querySelector('#editors-todo-title').focus();

    this.shadowRoot.querySelector('#button-editor-save').addEventListener('click', this._onEdit_Save.bind(this));
    this.shadowRoot.querySelector('#button-editor-cancel').addEventListener('click', this._onEdit_Cancel.bind(this));
  }

  _onEdit_Save() {
    this._UiState = ""
    this.shadowRoot.querySelector('#checkbox-completed').hidden = false;
    this.shadowRoot.querySelector('#display-1').hidden = false;
    this.shadowRoot.querySelector('#display-2').hidden = false;
    this.shadowRoot.querySelector('#editors-buttons').hidden = false;

    this.shadowRoot.querySelector('#editors').hidden = true;

    this.completed = this.shadowRoot.querySelector('#editors-checkbox').checked;
    this.title = this.shadowRoot.querySelector('#editors-todo-title').value;
    this.description = this.shadowRoot.querySelector('#editors-todo-description').value;

    this.dispatchEvent(new CustomEvent('update-todo-item', {
      bubbles: true,
      composed: true,
      detail: {
        id: this.id,
        completed: this.completed,
        title: this.title,
        description: this.description,
      },
    }));

    this._removeEditListeners();
  }

  _onEdit_Cancel() {
    this._UiState = ""
    this.shadowRoot.querySelector('#checkbox-completed').hidden = false;
    this.shadowRoot.querySelector('#display-1').hidden = false;
    this.shadowRoot.querySelector('#display-2').hidden = false;
    this.shadowRoot.querySelector('#editors-buttons').hidden = false;
    
    this.shadowRoot.querySelector('#editors').hidden = true;
    
    this._removeEditListeners();
  }

  _removeEditListeners() {
    this.shadowRoot.querySelector('#button-editor-save').removeEventListener('click', this._onEdit_Save.bind(this));
    this.shadowRoot.querySelector('#button-editor-cancel').removeEventListener('click', this._onEdit_Cancel.bind(this));
  }

  static observedAttributes = ["title", "description", "completed", "id"];

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[name] = newValue;
      this._updateUIFromState();
    }
  }

  get id() {
    return this._id ?? "";
  }

  set id(v) {
    this.setAttribute("id", v)
    this._id = v
  }

  get title() {
    return this._title ?? "";
  }
  set title(v) {
    this.setAttribute("title", v);
    this._title = v
  }

  get description() {
    return this._description ?? "";
  }
  set description(v) {
    this.setAttribute("description", v);
    this._description = v
  }

  get completed() {
    return this._completed;
  }
  set completed(v) {
    if (v == "true") {
      this.setAttribute("completed", "");
      this._completed = true
      this.shadowRoot.getElementById('checkbox-completed').checked = true
    } else {
      this.removeAttribute("completed");
      this._completed = false
      this.shadowRoot.getElementById('checkbox-completed').checked = false
    }
  }

  _updateUIFromState() {
    this.shadowRoot.querySelector('input').checked = this._completed ? true : false;
    this.shadowRoot.querySelector('slot').textContent = this._title;
    this.shadowRoot.querySelector('slot[name="description"]').textContent = this._description;
    this.classList.toggle('completed', this._completed);
  }

}
customElements.define('todo2-item', Todo2Item);
