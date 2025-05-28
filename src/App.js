import React from 'react';
import AnalogClock from './components/AnalogClock';
import DigitalTime from './components/DigitalTime';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="clock-container">
        <h1 className="app-title">Analog Clock</h1>
        <AnalogClock />
        <DigitalTime />
      </div>
    </div>
  );
}

export default App; 