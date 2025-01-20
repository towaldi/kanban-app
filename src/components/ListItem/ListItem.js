import React from 'react';
import { NavLink } from 'react-router-dom';
// Style
import './ListItem.css';

export default function ListItem({ icon, label, to }) {
  return (
    <li className='list-item'>
      <NavLink
        to={to}
        className={({ isActive }) => (isActive ? 'link active' : 'link')}
      >
        <span>{icon}</span>
        <p>{label}</p>
      </NavLink>
    </li>
  );
}
