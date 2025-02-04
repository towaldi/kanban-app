import React from 'react';
// Style
import './Select.css';

export default function Select({ label, name, value, onChange }) {
  return (
    <label className='select'>
        {label}
        <select 
            name={name}
            value={value}
            onChange={onChange}
        >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
        </select>
    </label>
  )
}
