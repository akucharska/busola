import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import * as retargetEvents from 'react-shadow-dom-retarget-events';
import { Button, CheckBox } from '@ui5/webcomponents-react';

export default class CollapsiblePanel extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('span');
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);

    const name = this.getAttribute('name');
    const url = 'https://www.google.com/search?q=' + encodeURIComponent(name);
    const root = ReactDOM.createRoot(mountPoint);
    root.render(<a href={url}>{name}</a>);
  }
}

customElements.define('sth-sth', CollapsiblePanel);
