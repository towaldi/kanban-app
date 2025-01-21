import React from 'react';
import { NavLink } from 'react-router-dom';
// Style
import './ListItem.css';

export default function ListItem({ icon: Icon, label, to }) {
  return (
    <li className='list-item'>
      <NavLink 
        to={to}
        className={({isActive}) => `list-item-link ${isActive ? "active" : ""}`}
      >
        <Icon 
          className="icon"
          size={20}
        />
        <p className='list-item-label'>{label}</p>
      </NavLink>
    </li>
  );
}