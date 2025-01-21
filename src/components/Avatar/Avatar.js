import React, { useState } from 'react';
// Components
import Menu from '../Menu/Menu';
// Style
import './Avatar.css';

export default function Avatar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prevState) => !prevState);
    }

    return (
        <div className='avatar-container'>
            <button className='avatar'>
                <p onClick={toggleMenu}>OP</p>
            </button>
            {isMenuOpen && <Menu />}
        </div>
  )
}
