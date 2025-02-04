import React from 'react';
// Style
import './Textarea.css'

export default function Textarea({ label, name, value, onChange }) {
  return (
    <label className='textarea'>
        {label}
        <textarea 
          name={name} 
          value={value} 
          onChange={onChange}
        >
        </textarea>
    </label>
  )
}
