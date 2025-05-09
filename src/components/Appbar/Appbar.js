import React from 'react';
import { getAuth } from 'firebase/auth';
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

  // Get the current user
  const auth = getAuth();
  const user = auth.currentUser;
  const email = user?.email || "";


  return (
    <div className='app-bar'>
      <div className='app-bar-controls'>
        {!isNavbarVisible && <img className='logo-icon' src={palantirLogo} alt='Logo'/>}
        <IconButton 
          onClick={toggleNavbar}
          icon={icon}
        />
      </div>
      <Avatar email={email}/>
    </div>
  )
}
