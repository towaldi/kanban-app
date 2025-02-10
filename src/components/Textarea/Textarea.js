import React from 'react';
// Style
import './Textarea.css'

export default function Textarea({ label, name, value, onChange, error }) {
  return (
    <label className='textarea'>
        {label}
        <textarea 
          name={name} 
          value={value} 
          onChange={onChange}
          className={error ? "textarea-error" : ""}
        >
        </textarea>
        {error && <p className='textarea-helper-text'>{error}</p>}
    </label>
  )
}
