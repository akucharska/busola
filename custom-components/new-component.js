import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

// import * as retargetEvents from 'react-shadow-dom-retarget-events';
import { Button, CheckBox } from '@ui5/webcomponents-react';
// function Sth({ text }) {
//   return (<div>hi</div>);
// }
export default class CollapsiblePanel extends HTMLElement {
  static get observedAttributes() {
    return ['title'];
  }

  createCollapsed(title = 'ss') {
    return React.createElement(
      CheckBox,
      { text: 'lolo' },
      React.createElement('slot'),
    );
  }

  connectedCallback() {
    this.mountPoint = document.createElement('div');
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(this.mountPoint);

    const title = this.getAttribute('title');
    ReactDOM.render(this.createCollapsed(title), this.mountPoint);
    // retargetEvents(shadowRoot);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'title') {
      ReactDOM.render(this.createCollapsed(newValue), this.mountPoint);
    }
  }
}
