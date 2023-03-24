  // import {TodoItem} from '/todo-item.js';
  // import {Todo2Item} from '/todo2-item.js';
  // import {TodoInput} from '/todo-input.js';
  import {v4 as uuidv4} from './node_modules/uuid/dist/esm-browser/index.js';


  const todoList = document.querySelector('#todo-list');
  const todoInput = document.querySelector('todo-input');
  const todos = [];

  // const todo2Item = new Todo2Item();
  // todo2Item.setAttribute('id', '12345');
  // todo2Item.setAttribute('title', 'A Real Todo');
  // todo2Item.setAttribute('description', 'A real description');
  // todoList.appendChild(todo2Item);

  // const todoInputItem = new TodoInput();
  // todoInput.appendChild(todoInputItem);

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
    const event = new CustomEvent('add', {
      bubbles: true,
      composed: true,
      detail: todo,
    });
    document.dispatchEvent(event);
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

  // Listen for the toggle event
  document.addEventListener('toggle', (e) => {
    const index = todos.findIndex((todo) => todo.id === e.target.getAttribute("id"));

    // console.log(`todos[${index}]`, todos[index]);

    let todoCompleted = todos[index]?.completed ?? false;
    todos[index].completed = !todoCompleted;
    render();
  });

  // Listen for the delete event
  document.addEventListener('delete', (e) => {
    const index = todos.findIndex((todo) => todo.id === e.target.getAttribute("id"));
    todos.splice(index, 1);
    render();
  })

  // Listen for the add event
  document.addEventListener('add', (e) => {
    const todo = {
      id: e.detail.id,
      title: e.detail.title,
      description: e.detail.description,
    };
    todos.push(todo);
    render();

    // clear input fields
    document.querySelector('#todo-title').value = '';
    document.querySelector('#todo-description').value = '';

    // focus on title input
    document.querySelector('#todo-title').focus();
  });

  // Listen for the save item event
  document.addEventListener('update_todo_item', (e) => {
    const index = todos.findIndex((todo) => todo.id === e.target.getAttribute("id"));
    if(index != -1) {
      todos[index].title = e.detail.title;
      todos[index].description = e.detail.description;
      todos[index].completed = e.detail.completed;
      render();
    }
  });

  // // Defer setup until the DOM is ready
  // document.addEventListener('DOMContentLoaded', () => {
  //   // todoInput.addEventListener('submit', (e) => {
  //   //   e.preventDefault();
  //   //   const todo = {
  //   //     text: todoInput.value,
  //   //     completed: false,
  //   //   };
  //   //   todos.push(todo);
  //   //   render();
  //   //   todoInput.value = '';
  //   // });
  // });

  function render() {
    // render all the todos in the todos array into a ul
    const todoList = document.querySelector('#todo-list');
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
      const todoItem = document.createElement('todo2-item');
      todoItem.setAttribute('index', index);
      todoItem.setAttribute('id', todo.id);
      todoItem.setAttribute('title', todo.title);
      todoItem.setAttribute('description', todo.description);
      todoItem.setAttribute('completed', todo.completed);
      todoItem.innerHTML = `
        ${todo.title}
        <div slot="description">
          <p>${todo.description}</p>
          <p>${todo.completed ? 'Completed' : 'Not Completed'}</p>
        </div>
      `;
      todoList.appendChild(todoItem);
    });
  }

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
  }

  initTodos();
  render();