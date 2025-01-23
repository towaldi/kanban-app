import React from 'react';
import { LogOut } from 'lucide-react';
// Components
import LogoutButton from '../Button/LogoutButton';
// Style
import './Menu.css';

export default function Menu() {
  return (
    <div className="menu">
      {/* Pass LogOut as a component reference */}
      <LogoutButton icon={LogOut} label="Logout" />
    </div>
  );
}