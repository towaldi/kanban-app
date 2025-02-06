import React from 'react';
// Style
import "./Button.css"

export default function Button({ style, label, onClick, type="button" }) {
  return (
    <button 
      className={`btn ${style}`} 
      onClick={onClick}
      type={type}
    >
      {label}
    </button>
  )
}
