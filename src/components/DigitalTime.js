import React, { useState, useEffect } from 'react';
import './DigitalTime.css';

const DigitalTime = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="digital-time">
      <div className="time-display">
        {formatTime(time)}
      </div>
      <div className="date-display">
        {formatDate(time)}
      </div>
    </div>
  );
};

export default DigitalTime; 