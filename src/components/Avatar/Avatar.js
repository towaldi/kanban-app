import React, { useState } from 'react';
// Component
import Menu from '../Menu/Menu';
// Style
import './Avatar.css';

export default function Avatar({ email }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const initials = email ? email.slice(0, 2).toUpperCase() : "??";

  return (
    <div className="avatar-container">
      <button className="avatar" onClick={toggleMenu}>
        <p>{initials}</p>
      </button>
      {isMenuOpen && <Menu />}
    </div>
  );
}
