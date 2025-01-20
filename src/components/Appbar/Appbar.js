import React from 'react';
// Components
import Button from '../Button/Button';
// Style
import './Appbar.css';


export default function Appbar() {
  return (
    <div className='app-bar'>
      <Button
        label="Logout"
      />
    </div>
  )
}
