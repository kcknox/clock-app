import React, { useState, useEffect } from 'react';
import './AnalogClock.css';

const AnalogClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const secondAngle = (time.getSeconds() * 6) - 90; // 6 degrees per second
  const minuteAngle = (time.getMinutes() * 6) + (time.getSeconds() * 0.1) - 90; // 6 degrees per minute + smooth seconds
  const hourAngle = ((time.getHours() % 12) * 30) + (time.getMinutes() * 0.5) - 90; // 30 degrees per hour + smooth minutes

  // Generate hour markers
  const hourMarkers = [];
  for (let i = 1; i <= 12; i++) {
    const angle = (i * 30) - 90;
    const x1 = 50 + 35 * Math.cos(angle * Math.PI / 180);
    const y1 = 50 + 35 * Math.sin(angle * Math.PI / 180);
    const x2 = 50 + 40 * Math.cos(angle * Math.PI / 180);
    const y2 = 50 + 40 * Math.sin(angle * Math.PI / 180);
    
    hourMarkers.push(
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="rgba(255, 255, 255, 0.8)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    );
  }

  // Generate minute markers
  const minuteMarkers = [];
  for (let i = 1; i <= 60; i++) {
    if (i % 5 !== 0) { // Skip hour markers
      const angle = (i * 6) - 90;
      const x1 = 50 + 37 * Math.cos(angle * Math.PI / 180);
      const y1 = 50 + 37 * Math.sin(angle * Math.PI / 180);
      const x2 = 50 + 40 * Math.cos(angle * Math.PI / 180);
      const y2 = 50 + 40 * Math.sin(angle * Math.PI / 180);
      
      minuteMarkers.push(
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="1"
          strokeLinecap="round"
        />
      );
    }
  }

  // Generate numbers
  const numbers = [];
  for (let i = 1; i <= 12; i++) {
    const angle = (i * 30) - 90;
    const x = 50 + 28 * Math.cos(angle * Math.PI / 180);
    const y = 50 + 28 * Math.sin(angle * Math.PI / 180);
    
    numbers.push(
      <text
        key={i}
        x={x}
        y={y + 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="rgba(255, 255, 255, 0.9)"
        fontSize="4"
        fontWeight="500"
        fontFamily="Inter, sans-serif"
      >
        {i}
      </text>
    );
  }

  return (
    <div className="analog-clock">
      <svg viewBox="0 0 100 100" className="clock-face">
        {/* Outer ring */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="0.5"
        />
        
        {/* Inner ring */}
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="rgba(255, 255, 255, 0.05)"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="0.5"
        />

        {/* Hour markers */}
        {hourMarkers}
        
        {/* Minute markers */}
        {minuteMarkers}
        
        {/* Numbers */}
        {numbers}

        {/* Hour hand */}
        <line
          x1="50"
          y1="50"
          x2={50 + 20 * Math.cos(hourAngle * Math.PI / 180)}
          y2={50 + 20 * Math.sin(hourAngle * Math.PI / 180)}
          stroke="rgba(255, 255, 255, 0.9)"
          strokeWidth="3"
          strokeLinecap="round"
          className="hour-hand"
        />

        {/* Minute hand */}
        <line
          x1="50"
          y1="50"
          x2={50 + 30 * Math.cos(minuteAngle * Math.PI / 180)}
          y2={50 + 30 * Math.sin(minuteAngle * Math.PI / 180)}
          stroke="rgba(255, 255, 255, 0.9)"
          strokeWidth="2"
          strokeLinecap="round"
          className="minute-hand"
        />

        {/* Second hand */}
        <line
          x1="50"
          y1="50"
          x2={50 + 35 * Math.cos(secondAngle * Math.PI / 180)}
          y2={50 + 35 * Math.sin(secondAngle * Math.PI / 180)}
          stroke="#ff6b6b"
          strokeWidth="1"
          strokeLinecap="round"
          className="second-hand"
        />

        {/* Center dot */}
        <circle
          cx="50"
          cy="50"
          r="2"
          fill="rgba(255, 255, 255, 0.9)"
        />
        
        {/* Center dot highlight */}
        <circle
          cx="50"
          cy="50"
          r="1"
          fill="#ff6b6b"
        />
      </svg>
    </div>
  );
};

export default AnalogClock; 