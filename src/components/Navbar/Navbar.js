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
                icon={<LayoutDashboard color={"var(--gray-600)"} size={20}/>}
                label="Summary"
                to="/summary" 
            />
            <ListItem
                icon={<StickyNote color={"var(--gray-600)"} size={20}/>}
                label="Add Task"
                to="/add-task" 
            />
            <ListItem
                icon={<Columns3 color={"var(--gray-600)"} size={20}/>}
                label="Board"
                to="/board" 
            />
            <ListItem 
                icon={<Contact color={"var(--gray-600)"} size={20}/>}
                label="Contacts"
                to="/contacts"
            />
        </ul>
        <ul className='list-items'>
            <ListItem 
                icon={<Shield color={"var(--gray-600)"} size={20}/>}
                label="Privacy"
                to="/privacy"
            />
            <ListItem 
                icon={<Section color={"var(--gray-600)"} size={20}/>}
                label="Legal notice"
                to="/legal-notice"
            />
        </ul>
    </nav>
  )
}
