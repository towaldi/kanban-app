import React from 'react';
// Components
import Avatar from '../Avatar/Avatar';
import IconButton from '../IconButton/IconButton';
import palantirLogo from '../../assets/palantir.png';
// Style
import './Appbar.css';


export default function Appbar({ toggleNavbar, isNavbarVisible }) {

  return (
    <div className='app-bar'>
      <div className='app-bar-controls'>
        {!isNavbarVisible && <img className='logo-icon' src={palantirLogo} alt='Logo'/>}
        <IconButton 
          onClick={toggleNavbar}
          isExpanded={isNavbarVisible}
        />
      </div>
      <Avatar />
    </div>
  )
}
