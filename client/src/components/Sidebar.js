// src/components/Sidebar.js
import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => window.alert('Navigate to Key Skills')}>Key Skills</li>
        <li onClick={() => window.alert('Navigate to Projects')}>Projects</li>
        <li onClick={() => window.alert('Check the Royal Mail Post Box')}>Contact Me</li>
      </ul>
    </div>
  );
};

export default Sidebar;
