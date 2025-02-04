import React from 'react';
// Components
import Avatar from '../Avatar/Avatar';
import IconButton from '../IconButton/IconButton';
import palantirLogo from '../../assets/palantir.png';
// Icons
import { PanelLeftClose, PanelRightClose } from 'lucide-react';
// Style
import './Appbar.css';


export default function Appbar({ toggleNavbar, isNavbarVisible }) {
  // Determine the icon based on navbar state
  const icon = isNavbarVisible ? PanelLeftClose : PanelRightClose;


  return (
    <div className='app-bar'>
      <div className='app-bar-controls'>
        {!isNavbarVisible && <img className='logo-icon' src={palantirLogo} alt='Logo'/>}
        <IconButton 
          onClick={toggleNavbar}
          icon={icon}
        />
      </div>
      <Avatar />
    </div>
  )
}
