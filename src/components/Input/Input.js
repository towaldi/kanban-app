import React from 'react';
// Style
import './Input.css';

export default function Input({ label, type, placeholder, value, onChange, required }) {
  return (
    <div className='input-field'>
        {label && <label>{label}</label>}
        <input 
            className='input'
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
        />
    </div>
  )
}
