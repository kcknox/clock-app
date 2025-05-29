import React, { useEffect, useState } from 'react';
import AnalogClock from './components/AnalogClock';
import DigitalTime from './components/DigitalTime';
import './App.css';

function App({ lithiumClient }) {
  const [headerColor, setHeaderColor] = useState('white'); // Default color

  useEffect(() => {
    if (lithiumClient && typeof lithiumClient.registerCallback === 'function') {
      console.log('Analog Clock App received lithiumClient:', lithiumClient);
      
      const eventName = 'customClockEvent'; // Example event name the clock might care about

      const handleClientMessage = (data) => {
        console.log(`App received '${eventName}' from lithiumClient:`, data);
        // Example: Update clock appearance or show a notification
        // e.g., if (data.payload.theme === 'dark') { setClockTheme('dark'); }
      };

      console.log(`App: Registering callback for '${eventName}'`);
      lithiumClient.registerCallback(eventName, handleClientMessage);
      
      // Optional: Demonstrate sending a command if needed
      // if (typeof lithiumClient.sendCommand === 'function') {
      //   lithiumClient.sendCommand({
      //     method: '/clock/ready',
      //     payload: { status: 'Clock component initialized and listening' }
      //   });
      // }
      
      // Handler for /clock/change_color event
      const changeColorEventName = '/clock/change_color';
      const handleChangeColorEvent = (message) => {
        console.log(`App received '${changeColorEventName}' from lithiumClient:`, message);
        if (message && message.data && message.data.color) {
          const { r, g, b } = message.data.color;
          const newColor = `rgb(${r}, ${g}, ${b})`;
          console.log('Setting header color to:', newColor);
          setHeaderColor(newColor);
        }
      };
      lithiumClient.registerCallback(changeColorEventName, handleChangeColorEvent);
      
      return () => {
        if (lithiumClient && typeof lithiumClient.unregisterCallback === 'function') {
          console.log(`App: Unregistering callback for '${eventName}'`);
          lithiumClient.unregisterCallback(eventName, handleClientMessage);
          console.log(`App: Unregistering callback for '${changeColorEventName}'`);
          lithiumClient.unregisterCallback(changeColorEventName, handleChangeColorEvent);
        }
      };
    } else if (lithiumClient) {
      console.warn('Analog Clock App received lithiumClient, but it does not have registerCallback method.', lithiumClient);
    }
  }, [lithiumClient]);

  return (
    <div className="app">
      <div className="clock-container">
        <h1 className="app-title" style={{ color: headerColor }}>Analog Clock</h1>
        <AnalogClock />
        <DigitalTime />
      </div>
    </div>
  );
}

export default App; 