import React from 'react';
// Style
import './Textarea.css'

export default function Textarea({ label }) {
  return (
    <label className='textarea'>
        {label}
        <textarea>

        </textarea>
    </label>
  )
}
