/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { __decorate } from "tslib";
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
let MyElement = class MyElement extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * The name to say "Hello" to.
         */
        this.name = 'World';
        /**
         * The number of times the button has been clicked.
         */
        this.count = 0;
        this.myString = 'Hello';
    }
    render() {
        return html `
      <h1>${this.sayHello(this.name)}!</h1>
      <button @click=${this._onClick} part="button">
        Click Count: ${this.count}
        ${this.myString}
      </button>
      <slot></slot>
    `;
    }
    _onClick() {
        this.count++;
        this.myString = this.getRandomStringOf5Characters();
        //this.dispatchEvent(event); // only dispatches inside this element
        let event = new CustomEvent('count-changed', {
            detail: {
                count: this.count,
                source: this,
            },
        });
        document.dispatchEvent(event); // dispatches globally
    }
    getRandomStringOf5Characters() {
        return Math.random().toString(36).substring(2, 7);
    }
    /**
     * Formats a greeting
     * @param name The name to say "Hello" to
     */
    sayHello(name) {
        return `Hello, ${name}`;
    }
};
MyElement.styles = css `
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
  `;
__decorate([
    property()
], MyElement.prototype, "name", void 0);
__decorate([
    property({ type: Number })
], MyElement.prototype, "count", void 0);
__decorate([
    property({ type: String })
], MyElement.prototype, "myString", void 0);
MyElement = __decorate([
    customElement('my-element')
], MyElement);
export { MyElement };
//# sourceMappingURL=my-element.js.map