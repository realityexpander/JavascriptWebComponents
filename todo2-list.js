import {v4 as uuidv4} from './node_modules/uuid/dist/esm-browser/index.js';

class Todo2List extends HTMLElement {

  static get componentStyle() {
    return `
    .item_group {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.1rem;
      border: 1px solid #ccc;
      border-radius: 0.25rem;
      margin-bottom: 0.2rem;
    }
    .item__text {
      flex: 1;
      margin: 1.2rem;
    }
    .item__button {
      padding: 0.15rem 0.1rem;
      border: 1px solid #ccc;
      border-radius: 0.25rem;
      background-color: #fff;
      cursor: pointer;
    }
    .item__button:hover {
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
    h4 {
      margin: 0;
      padding: 1rem 1rem 0 1rem;
    }
    img {
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
        ${Todo2List.componentStyle}
      </style>

      <h4>Todo List</h4>
        <slot></slot>
    `;

    shadowRoot.appendChild(template.content.cloneNode(true));

    // Internal Object Properties
    this._todos = [];
  }

  static observedAttributes = ["todos"];

  connectedCallback() {
    this.render();

    // Listen for events
    document.addEventListener('add-todo-item', (e) => this._addTodoItem(e));
    document.addEventListener('delete-todo-item', (e) => this._deleteTodoItem(e));
    document.addEventListener('update-todo-item', (e) => this._updateTodoItem(e));
    document.addEventListener('toggle-todo-item', (e) => this._toggleTodoItem_completed(e));
    document.addEventListener('set-todos', (e) => this._setTodos(e));
  }

  disconnectedCallback() {
    // Remove event listeners
    document.removeEventListener('add-todo-item', (e) => this._addTodoItem(e));
    document.removeEventListener('delete-todo-item', (e) => this._deleteTodoItem(e));
    document.removeEventListener('update-todo-item', (e) => this._updateTodoItem(e));
    document.removeEventListener('toggle-todo-item', (e) => this._toggleTodoItem_completed(e));
    document.removeEventListener('set-todos', (e) => this._setTodos(e));
  }

  adoptedCallback() {
    console.log('Todo2List adopted');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[name] = newValue;
    }
  }

  _addTodoItem(e) {
    let newTodo = {
      id: e.detail.id,
      title: e.detail.title,
      description: e.detail.description,
      completed: e.detail.completed
    }
    this._todos.push(newTodo);
    this.todos = this._todos
  }

  _deleteTodoItem(e) {
    // find id of todo to delete
    let id = e.target.getAttribute('id');
    let index = this._todos.findIndex(todo => todo.id == id);
    this._todos.splice(index, 1);
    this.todos = this._todos
  }

  _updateTodoItem(e) {
    // find id of todo to update
    let id = e.detail.id;
    let index = this._todos.findIndex(todo => todo.id == id);

    // update todo
    this._todos[index].title = e.detail.title;
    this._todos[index].description = e.detail.description;
    this._todos[index].completed = e.detail.completed;

    this.todos = this._todos
  }

  _setTodos(e) {
    this.todos = e.detail
  }

  _toggleTodoItem_completed(e) {
    // find id of todo to update
    //let id = e.target.getAttribute('id');
    let id = e.detail.id
    let index = this._todos.findIndex(todo => todo.id == id);

    // update todo
    this._todos[index].completed = !this._todos[index].completed;

    this.todos = this._todos
  }

  get todos() {
    return this._todos;
  }
  set todos(value) {
    if(value == undefined) return
    if(value.length == 0) return

    // if value is a string, parse it
    if(typeof value === 'string') {
      this.setAttribute("todos", value); // must use a Json string  
      this._todos = this._getTodosFromJsonString(value); // must use a real value
    } else if(typeof value === 'object') {
      this._todos = value;
    } else {
      throw new Error('Invalid value type. Must be a Json string or an array.');
    }

    this.render();
  }

  _getTodosFromJsonString(jsonString) {
    let parsedValue = JSON.parse(jsonString) 
    let parsedTodos = parsedValue.map(value => {
      return {
        id: value.id || uuidv4(),
        title: value.title || 'New Todo',
        description: value.description || '',
        completed: value.completed || false
      }
    })

    return parsedTodos
  }

  render() {
    if(this._todos == undefined) return
    if(this._todos.length == 0) return
    
    const list = this.shadowRoot.querySelector('slot');
    list.innerHTML = '';
    this._todos.forEach((todo, index) => {
      const todoItem = document.createElement('todo2-item');
      todoItem.setAttribute('index', index);
      todoItem.setAttribute('id', todo.id);
      todoItem.setAttribute('title', todo.title);
      todoItem.setAttribute('description', todo.description);
      todoItem.setAttribute('completed', todo.completed);
      todoItem.innerHTML = `
        ${todo.title}
        <br>${todo.description}
        <div slot="description">
          <p>${todo.completed ? 
            'Completed'
            : `
              <img id="loading" 
                src="https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif" 
                width="25px" 
                height="25px" 
                alt="loading"
              />` //'Not Completed' 
            }</p>
        </div>
      `;
      list.appendChild(todoItem);
    });
  }
}
customElements.define('todo2-list', Todo2List);