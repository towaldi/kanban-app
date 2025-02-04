import React from 'react';
// Style
import './IconButton.css';

export default function IconButton({ icon: Icon, onClick }) {
  return (
    <button className='icon-button' onClick={onClick}>
      {Icon && <Icon size={20} />}
    </button>
  )
}
