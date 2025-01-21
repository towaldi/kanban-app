import React from 'react';
// Components
import ListItem from '../ListItem/ListItem';
import { Columns3, Contact, LayoutDashboard, Section, Shield, StickyNote } from 'lucide-react';
// Style
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className='navbar'>
        <ul className='list-items'>
            <ListItem
                icon={LayoutDashboard}
                label="Summary"
                to="/summary" 
            />
            <ListItem
                icon={StickyNote}
                label="Add Task"
                to="/add-task" 
            />
            <ListItem
                icon={Columns3}
                label="Board"
                to="/board" 
            />
            <ListItem 
                icon={Contact}
                label="Contacts"
                to="/contacts"
            />
        </ul>
        <ul className='list-items'>
            <ListItem 
                icon={Shield}
                label="Privacy"
                to="/privacy"
            />
            <ListItem 
                icon={Section}
                label="Legal notice"
                to="/legal-notice"
            />
        </ul>
    </nav>
  )
}
