import React from 'react';
// Style
import './Select.css';

export default function Select({ label }) {
  return (
    <label className='select'>
        {label}
        <select>
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
        </select>
    </label>
  )
}
