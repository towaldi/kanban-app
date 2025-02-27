import React from 'react';
// Components
import Avatar from '../Avatar/Avatar';
// Style
import './ContactListItem.css';

export default function ContactListItem({ contact, onSelect }) {
  return (
    <li 
        className='contact-list-item'
        onClick={() => onSelect(contact)}
    >
      <Avatar />
      <div className='column-1'>
        <h3>{contact.name}</h3>
        <p>{contact.email}</p>
        <p>{contact.phone}</p>
      </div>
    </li>
  )
}
