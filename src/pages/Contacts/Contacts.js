import React from 'react';
// Components
import Button from '../../components/Button/Button';
import ContactList from '../../components/ContactList/ContactList';
//Style
import './Contacts.css';

export default function Contacts() {
  return (
    <div className='workspace'>
      <div className='workspace-header'>
        <h1>Contacts</h1>
        <Button 
          style="btn-primary" 
          label="Add Contact"
        />
      </div>
      <div className='row-gap-1'>
        <ContactList />
      </div>
    </div>
  )
}
