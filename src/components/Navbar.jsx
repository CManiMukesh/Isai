// src/components/Navbar.jsx
import React from 'react';
import '../styles/navbar.css';

const Navbar = ({ activeView, onViewChange }) => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <span className="logo-text">isai</span>
      </div>
      <div className="nav-center">
        <button className={`nav-item ${activeView === 'home' ? 'active' : ''}`} onClick={() => onViewChange('home')}>Home</button>
        <button className={`nav-item ${activeView === 'search' ? 'active' : ''}`} onClick={() => onViewChange('search')}>Search</button>
      </div>
      <div className="nav-right">
        <p>🖤</p>
      </div>
    </nav>
  );
};

export default Navbar;