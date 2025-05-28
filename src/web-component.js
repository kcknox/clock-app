import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

class AnalogClockWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.root = null;
  }

  connectedCallback() {
    // Create a container div for React
    const container = document.createElement('div');
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    
    // Add Google Fonts link to shadow DOM
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    fontLink.rel = 'stylesheet';
    
    this.shadowRoot.appendChild(fontLink);
    this.shadowRoot.appendChild(container);

    // Create React root and render the app
    this.root = ReactDOM.createRoot(container);
    this.root.render(React.createElement(App));
  }

  disconnectedCallback() {
    if (this.root) {
      this.root.unmount();
    }
  }

  // Allow setting custom width and height
  static get observedAttributes() {
    return ['width', 'height'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'width' || name === 'height') {
      this.style[name] = newValue;
    }
  }
}

// Define the custom element
customElements.define('analog-clock', AnalogClockWebComponent);

// Export for module usage
export default AnalogClockWebComponent; 