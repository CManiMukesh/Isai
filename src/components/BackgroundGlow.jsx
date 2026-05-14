// src/components/BackgroundGlow.jsx
import React from 'react';
import '../styles/background.css';

const BackgroundGlow = ({ themeColor }) => {
  const glowStyle = {
    background: `radial-gradient(circle at 50% 40%, ${themeColor}80 0%, rgba(0,0,0,0.9) 80%)`
  };
  
  return (
    <div className="background-glow" style={glowStyle}>
      <div className="glow-overlay" style={{ background: `radial-gradient(circle, ${themeColor}40, transparent)` }}></div>
    </div>
  );
};

export default BackgroundGlow;