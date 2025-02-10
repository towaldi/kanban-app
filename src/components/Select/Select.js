import React from 'react';
// Style
import './Select.css';

export default function Select({ label, name, value, onChange, options = [], error }) {
  return (
    <label className='select'>
        {label}
        <select 
            name={name}
            value={value}
            onChange={onChange}
            className={error ? "select-error" : ""}
        >
            <option value="" disabled>Select a {label}</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
        </select>
        {error && <p className='select-helper-text'>{error}</p>}
    </label>
  )
}
