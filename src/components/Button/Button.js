import React from 'react';
// Style
import "./Button.css"

export default function Button({ label }) {
  return (
    <button className='btn btn-primary'>
      {label}
    </button>
  )
}
