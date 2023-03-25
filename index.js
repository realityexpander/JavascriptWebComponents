  // import {TodoItem} from '/todo-item.js';
  // import {Todo2Item} from '/todo2-item.js';
  // import {TodoInput} from '/todo-input.js';
  import {v4 as uuidv4} from './node_modules/uuid/dist/esm-browser/index.js';

  const todoList = document.querySelector('#todo-list');
  const todoInput = document.querySelector('todo-input');
  const todos = [];

  // setup add button listener
  const addButton = document.querySelector('#add-todo');
  addButton.addEventListener('click', (e) => {
    e.preventDefault();

    let title = document.querySelector('#todo-title').value;
    let description = document.querySelector('#todo-description').value;
    const todo = {
      id: uuidv4(),
      title: title,
      description: description,
      completed: false,
    };
    
    // send 'add' event
    const event = new CustomEvent('add-todo-item', {
      bubbles: true,
      composed: true,
      detail: todo,
    });
    document.dispatchEvent(event);

    // clear input fields
    document.querySelector('#todo-title').value = '';
    document.querySelector('#todo-description').value = '';

    // focus on title input
    document.querySelector('#todo-title').focus();
  });

  // listen for "enter" keypress on input
  document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && 
      (e.target.id === 'todo-title' || e.target.id === 'todo-description'
    )) {
      e.preventDefault();
      addButton.click();
    }
  });

  function initTodos() {
    todos.push({
      id: '12345',
      title: 'A Real Todo',
      description: 'A real description',
      completed: false,
    })
    todos.push({
      id: '12346',
      title: 'Another Real Todo',
      description: 'Another real description',
      completed: true,
    })
    todos.push({
      id: '12347',
      title: 'Yet Another Real Todo',
      description: 'Yet another real description',
      completed: false,
    })

    document.dispatchEvent(new CustomEvent('set-todos', {
      bubbles: true,
      composed: true,
      detail: todos
    }));
  }

  initTodos();