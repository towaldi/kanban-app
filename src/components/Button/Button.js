import React from 'react';
// Style
import "./Button.css"

export default function Button({ style, label }) {
  return (
    <button className={`btn ${style}`}>
      {label}
    </button>
  )
}
