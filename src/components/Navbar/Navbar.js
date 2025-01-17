import React from 'react';
// Style
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className='navbar'>
        <ul>
            <li>Summary</li>
            <li>Add Task</li>
            <li>Board</li>
            <li>Contacts</li>
        </ul>
        <ul>
            <li>Privacy</li>
            <li>Legal notice</li>
        </ul>
    </nav>
  )
}
