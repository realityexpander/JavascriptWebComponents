
// import { MDCDrawer } from "@material/drawer";
// import { MDCTopAppBar } from "@material/top-app-bar";
import { v4 as uuidv4 } from './node_modules/uuid/dist/esm-browser/index.js';

let state = {
  name: '',
  email: '',
}

//const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
const drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));

//const topAppBar = MDCTopAppBar.attachTo(document.getElementById('app-bar'));
const topAppBar = mdc.topAppBar.MDCTopAppBar.attachTo(document.getElementById('app-bar'));
topAppBar.setScrollTarget(document.getElementById('main-content'));
topAppBar.listen('MDCTopAppBar:nav', () => {
  drawer.open = !drawer.open;
});

// escape key closes drawer
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    drawer.open = false;
  }
});

const buttons = document.querySelectorAll('.mdc-button');
for (let i = 0, button; button = buttons[i]; i++) {
  mdc.ripple.MDCRipple.attachTo(button);
}

// When a nav-drawer item is clicked, or closed, set focus to the first input or button
const listEl = document.querySelector('.mdc-drawer .mdc-list');
const mainContentEl = document.querySelector('.main-content');
listEl.addEventListener('click', (event) => {
  // drawer.open = false;
  mainContentEl.querySelector('input, button')?.focus();
});
document.body.addEventListener('MDCDrawer:closed', () => {
  mainContentEl.querySelector('input, button')?.focus();
});

/////////////////////////////////////////////////////////////
// listen for text changes to Email Address
const emailAddressEl = document.querySelector('#ti-email-address');
const emailAddress = mdc.textField.MDCTextField.attachTo(document.querySelector('.mdc-text-field--filled'));
// emailAddressEl.addEventListener('input', (e) => {
//   document.querySelector('#ti-text-area').textContent = e.target.value;
//   state.email = e.target.value;
// });
emailAddress.foundation.adapter.registerInputInteractionHandler('input', (e) => {
  document.querySelector('#ti-text-area').textContent = e.target.value;
  state.email = e.data;
});

//////////////////////////////////////////////////////////////
// listen for text change to Your Name
const yourNameEl = document.querySelector('#ti-your-name');
const yourName = mdc.textField.MDCTextField.attachTo(document.querySelector(".mdc-text-field--outlined"));
yourName.foundation.adapter.registerInputInteractionHandler('input', () => {
  document.querySelector('#ti-text-area').textContent = yourNameEl.value;
  state.name = yourNameEl.value;
});


const snackbar = mdc.snackbar.MDCSnackbar.attachTo(document.querySelector('.mdc-snackbar'));
// Listen for btn-send-item button click
const sendItemButton = document.querySelector('#btn-send-item');
sendItemButton.addEventListener('click', (e) => {
  snackbar.labelText = `Your message has been sent to ${state.name} at ${state.email}.`;
  snackbar.actionButtonText = "Cancel";
  snackbar.closeOnEscape = true;
  snackbar.actionHandler = () => {
    console.log('snackbar action clicked (msg from action handler)');
  };
  snackbar.open();
});
// Listen for snackbar closing & actionButton
snackbar.listen('MDCSnackbar:closing', (e) => {
  if (e.detail.reason == 'action') {
    console.log('snackbar action button clicked');
  }
});
// escape key closes snackbar
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    snackbar.close();
  }
});

// Listen for btn-replace-html button click
const replaceHtmlButton = document.querySelector('#btn-replace-html');
replaceHtmlButton.addEventListener('click', (e) => {
  fetch("./html-fragment/card.html").then((response) => {
    return response.text();
  }).then((html) => {
    document.querySelector('#main-content').innerHTML = html;

    // re-attach event listeners
  });

});

///////////////// todos //////////////////////
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