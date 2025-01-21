import React from 'react';
import { LogOut, CircleUser } from 'lucide-react';
// Components
import ListItem from '../ListItem/ListItem';
// Style
import './Menu.css';

export default function Menu() {
  return (
    <div className='menu'>
        <ListItem 
            icon={LogOut}
            label="Logout"
            to="/signin"
        />
        <ListItem
            icon={CircleUser}
            label="Profile"
            to="/profile"
        />
    </div>
  )
}
