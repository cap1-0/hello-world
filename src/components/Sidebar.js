// src/components/Sidebar.js

import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div style={{ width: '250px', backgroundColor: '#f0f0f0', padding: '20px' }}>
      <h2>Side Menu</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
