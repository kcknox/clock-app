# 🕐 Analog Clock Web Component Integration Guide

This guide shows you how to integrate the Analog Clock as a standalone Web Component into any website or application.

## 🚀 Quick Start

### 1. Build the Web Component

First, install the development dependencies and build the component:

```bash
npm install
npm run build-component
```

This creates `dist/analog-clock-component.js` - a standalone bundle containing everything needed.

### 2. Include in Your HTML

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Website</title>
</head>
<body>
    <!-- Your existing content -->
    
    <!-- Include the web component -->
    <script src="path/to/analog-clock-component.js"></script>
    
    <!-- Use the component anywhere -->
    <analog-clock></analog-clock>
</body>
</html>
```

## 📋 Usage Examples

### Basic Usage
```html
<analog-clock></analog-clock>
```

### Custom Sizing
```html
<analog-clock width="400px" height="400px"></analog-clock>
```

### With CSS Styling
```html
<style>
.my-clock {
    width: 300px;
    height: 300px;
    margin: 20px auto;
    display: block;
}
</style>

<analog-clock class="my-clock"></analog-clock>
```

## 🔧 Integration Methods

### Method 1: Direct Script Include
```html
<script src="./analog-clock-component.js"></script>
<analog-clock></analog-clock>
```

### Method 2: ES6 Module
```javascript
import './analog-clock-component.js';

// Component is now available globally
document.body.innerHTML = '<analog-clock></analog-clock>';
```

### Method 3: Dynamic Loading
```javascript
// Load the component dynamically
const script = document.createElement('script');
script.src = './analog-clock-component.js';
script.onload = () => {
    // Component is ready to use
    const clock = document.createElement('analog-clock');
    document.body.appendChild(clock);
};
document.head.appendChild(script);
```

## 🎨 Customization

### Attributes
- `width`: Set custom width (e.g., "300px")
- `height`: Set custom height (e.g., "300px")

### Properties
- `lc`: Set a `LithiumClient` (or any WebSocket client with a similar interface) instance on the component. The component will use this client to listen for events (e.g., `customClockEvent`) and potentially send messages.
  ```javascript
  const clockElement = document.querySelector('analog-clock');
  
  // Assuming 'myLithiumClient' is an initialized LithiumClient instance
  // and is already connected or will connect.
  clockElement.lc = myLithiumClient;
  
  // The clock component will now log this client and register a callback for 'customClockEvent'.
  // To trigger this from your application (if you were simulating or directly invoking for testing):
  // 1. Ensure 'myLithiumClient' has a way to manually invoke callbacks or simulate a message for a method.
  // For example, if 'myLithiumClient' had a method like 'simulateServerMessage':
  // myLithiumClient.simulateServerMessage('customClockEvent', { detail: 'Your data here' });
  // Or, more realistically, the Lithium server would send a message that results in the
  // 'customClockEvent' callback being triggered within the LithiumClient.
  ```

### CSS Styling
The component uses Shadow DOM, so external styles won't interfere. However, you can style the component element itself:

```css
analog-clock {
    display: block;
    margin: 20px auto;
    border-radius: 50%;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}
```

## 🌐 Framework Integration

### React
```jsx
// In your React component
useEffect(() => {
    // Import the web component
    import('./analog-clock-component.js');
}, []);

return (
    <div>
        <analog-clock width="300px" height="300px"></analog-clock>
    </div>
);
```

### Vue.js
```vue
<template>
    <div>
        <analog-clock width="300px" height="300px"></analog-clock>
    </div>
</template>

<script>
export default {
    mounted() {
        import('./analog-clock-component.js');
    }
}
</script>
```

### Angular
```typescript
// In your component
ngOnInit() {
    import('./analog-clock-component.js');
}
```

```html
<!-- In your template -->
<analog-clock width="300px" height="300px"></analog-clock>
```

## 📦 Bundle Information

The built component (`analog-clock-component.js`) includes:
- React and ReactDOM (bundled)
- All CSS styles (inlined)
- Complete clock functionality
- Shadow DOM encapsulation

**File size**: ~150KB (minified)

## 🔒 Security & Isolation

- Uses Shadow DOM for style encapsulation
- No global CSS conflicts
- Self-contained with no external dependencies
- Safe to use in any environment

## 🐛 Troubleshooting

### Component Not Appearing
1. Ensure the script is loaded before using the component
2. Check browser console for errors
3. Verify the script path is correct

### Styling Issues
1. Remember that Shadow DOM isolates styles
2. Use the component's attributes for sizing
3. Style the `<analog-clock>` element itself, not its internals

### Performance
1. The component updates every second
2. Multiple instances are independent
3. Component cleans up when removed from DOM

## 📱 Browser Support

- Chrome 53+
- Firefox 63+
- Safari 10.1+
- Edge 79+

## 🔄 Updates

To update the component:
1. Make changes to the React source
2. Run `npm run build-component`
3. Replace the old `analog-clock-component.js` file

## 📄 License

This web component is open source and available under the MIT License. 