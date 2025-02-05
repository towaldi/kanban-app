import React from 'react';
// Style
import './Select.css';

export default function Select({ label, name, value, onChange, options = [] }) {
  return (
    <label className='select'>
        {label}
        <select 
            name={name}
            value={value}
            onChange={onChange}
        >
            <option value="" disabled>Select a {label}</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
        </select>
    </label>
  )
}
