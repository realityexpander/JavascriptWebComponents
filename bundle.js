// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}

const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
var native = {
  randomUUID
};

function v4(options, buf, offset) {
  if (native.randomUUID && !buf && !options) {
    return native.randomUUID();
  }

  options = options || {};
  const rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return unsafeStringify(rnds);
}

let state = {
  name: '',
  email: '',
};

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
// listen for text change to Email Address
document.querySelector('#ti-email-address');
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
document.querySelector('#todo-list');
document.querySelector('todo-input');
const todos = [];

// setup add button listener
const addButton = document.querySelector('#add-todo');
addButton.addEventListener('click', (e) => {
  e.preventDefault();

  let title = document.querySelector('#todo-title').value;
  let description = document.querySelector('#todo-description').value;
  const todo = {
    id: v4(),
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
  });
  todos.push({
    id: '12346',
    title: 'Another Real Todo',
    description: 'Another real description',
    completed: true,
  });
  todos.push({
    id: '12347',
    title: 'Yet Another Real Todo',
    description: 'Yet another real description',
    completed: false,
  });

  document.dispatchEvent(new CustomEvent('set-todos', {
    bubbles: true,
    composed: true,
    detail: todos
  }));
}

initTodos();
