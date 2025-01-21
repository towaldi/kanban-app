import React, { useState } from 'react';
// Components
import Avatar from '../Avatar/Avatar';
import Menu from '../Menu/Menu';
// Style
import './Appbar.css';


export default function Appbar() {

  return (
    <div className='app-bar'>
      <Avatar />
    </div>
  )
}
