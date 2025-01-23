import React, { useState } from 'react';
// Component
import Menu from '../Menu/Menu';
// Style
import './Avatar.css';

export default function Avatar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <div className="avatar-container">
      <button className="avatar" onClick={toggleMenu}>
        <p>OP</p>
      </button>
      {isMenuOpen && <Menu />}
    </div>
  );
}
