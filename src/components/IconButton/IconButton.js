import React from 'react';
// Style
import './IconButton.css';
import { PanelLeftClose, PanelRightClose } from 'lucide-react';

export default function IconButton({ onClick, isExpanded}) {
  return (
    <button className='icon-button' onClick={onClick}>
      {isExpanded ? <PanelLeftClose size={20} /> : <PanelRightClose size={20} />}
    </button>
  )
}
