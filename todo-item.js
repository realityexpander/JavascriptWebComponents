const todoStyle1 = `
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

class TodoItem extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <style>
        ${todoStyle}
        .completed {
          text-decoration: line-through;
        }
      </style>

      <label class="item">
        <input type="checkbox">
        <slot></slot> 
        :
        <span class="todo-item__text">
          <slot name="description"></slot>
        </span>
        <button class="todo-item__button">Delete</button>
      </label>
      hello there
    `;
  }

  // init() {
  //   console.log('init')
  //   this._toggleComplete = this._toggleComplete.bind(this);
  // }

  connectedCallback() {
    this.addEventListener('click', this._toggleCompleted);

    // add event listener to the delete button
    this.shadowRoot.querySelector('.todo-item__button').addEventListener('click', this.delete);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._toggleCompleted);
  }

  // setCompletedUI(val) {
  //   console.log(`setCompleted ${val}`)
  //   if (val) {
  //     console.log("set completed")
  //     this.setAttribute('completed', '');
  //   } else {
  //     console.log("remove completed")
  //     this.removeAttribute('completed');
  //   }
  // }

  _toggleCompleted() {
    let isCompleted = this.hasAttribute('completed');
    // this.setCompletedUI(!isCompleted);
    this.completed = !isCompleted;

    if(this.completed) {
      this.setAttribute('completed', '');
    } else {
      this.removeAttribute('completed');
    }
  }

  // // Changes coming from the browser (even if triggered by code)
  // attributeChangedCallback(name, oldValue, newValue) {
  //   if (name === 'completed') {
  //     if(newValue == "") {
  //       this.completed = true
  //       this.setAttribute('completed', '');
  //     } else {
  //       this.completed = false
  //       this.removeAttribute('completed');
  //     }
  //   }
  // }

  static get observedAttributes() {
    return ['completed'];
  }

  // get completed() {
  //   return this.hasAttribute('completed');
  // }

  // set completed(val) {
  //   if (val) {
  //     console.log("set completed")
  //     if(this.completed != true) {
  //       this.setAttribute('completed', '');
  //     }
  //   } else {
  //     console.log("set not completed")
  //     if(this.completed != false) {
  //       this.removeAttribute('completed');
  //     }
  //   }
  // }

  // toggle() {
  //   this._toggleComplete();
  // }

  delete() {
    this.parentNode.remove(this);
  }
}
customElements.define('todo-item', TodoItem);

class StartItem extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      Hello there from StartItem
    `;
  } 
}
customElements.define('start-item', StartItem);

// MISTAKE HERE
class Start2Item extends HTMLElement {
  constructor() {
    super();
    // note: this will override the style in the parent!!!
    this.innerHTML = `
      <style>
        h3 {
          color: blue; 
        }
      </style>
      <h3 class="item">${this.innerText}</h3>
    `;
  } 
}
customElements.define('start2-item', Start2Item);

class Start3Item extends HTMLElement {
         
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.append(this.getTemplate().content.cloneNode(true));
  } 

  getTemplate() {
    let template = document.createElement('template');   
    template.innerHTML = `
      <style>
        h3 {
            color: lightBlue;
            font-style: italic;
          }
        .smallfont {
            font-size: 0.70em;
            color: red;
        }
      </style>
      <h3 class="item">
        <slot></slot>
        <br>
        <slot class="smallfont" name="description"></slot>        
      </h3>
    `;

    return template;
  }

}
customElements.define('start3-item', Start3Item);