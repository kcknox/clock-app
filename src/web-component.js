import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

class AnalogClockWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._reactRoot = null;
    this._lithiumClient = null; // Internal storage for the client
  }

  connectedCallback() {
    this._render();
  }

  disconnectedCallback() {
    if (this._reactRoot) {
      this._reactRoot.unmount();
      this._reactRoot = null;
    }
  }

  // Getter and Setter for lithiumClient (lc property)
  get lc() {
    return this._lithiumClient;
  }

  set lc(clientInstance) {
    console.log('Web component lc property set:', clientInstance);
    this._lithiumClient = clientInstance;
    this._render(); // Re-render when the client is set
  }

  _render() {
    if (!this.shadowRoot) return;

    let container = this.shadowRoot.querySelector('#react-container');
    if (!container) {
      // Add Google Fonts link to shadow DOM (only once)
      if (!this.shadowRoot.querySelector('link[href*="fonts.googleapis.com"]')) {
        const fontLink = document.createElement('link');
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
        fontLink.rel = 'stylesheet';
        this.shadowRoot.appendChild(fontLink);
      }

      // Create a container div for React
      container = document.createElement('div');
      container.id = 'react-container';
      container.style.width = '100%';
      container.style.height = '100%';
      container.style.display = 'flex';
      container.style.alignItems = 'center';
      container.style.justifyContent = 'center';
      this.shadowRoot.appendChild(container);
    }

    if (!this._reactRoot) {
      this._reactRoot = ReactDOM.createRoot(container);
    }
    
    // Pass the lithiumClient to the App component
    this._reactRoot.render(React.createElement(App, { lithiumClient: this._lithiumClient }));
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
if (!customElements.get('analog-clock')) {
  customElements.define('analog-clock', AnalogClockWebComponent);
}

// Export for module usage
export default AnalogClockWebComponent; 