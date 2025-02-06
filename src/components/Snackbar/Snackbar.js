import React from 'react';
// Components
import IconButton from '../IconButton/IconButton';
// Icons
import { X } from 'lucide-react';
// Style
import './Snackbar.css';

export default function Snackbar({ label, onClose }) {
  return (
    <div className='snackbar'>
      <p>{label}</p>
      <IconButton 
        icon={X}
        onClick={onClose}
      />
    </div>
  )
}
