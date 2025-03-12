import React from 'react';
// Components
import AvatarContact from '../Avatar/AvatarContact';
// Style
import './ContactListItem.css';

export default function ContactListItem({ contact, onSelect, isSelected }) {
  return (
    <li 
        className={`contact-list-item ${isSelected ? 'active' : ''}`} // Apply 'active' class
        onClick={() => onSelect(contact)}
    >
      <AvatarContact name={contact.name} />
      <div className='column-1'>
        <h3>{contact.name}</h3>
        <p>{contact.email}</p>
        <p>{contact.phone}</p>
      </div>
    </li>
  )
}
