import React, { useState } from 'react';
// Components
import Button from '../../components/Button/Button';
import ContactList from '../../components/ContactList/ContactList';
import ContactDetails from '../../components/ContactDetails/ContactDetails';
//Style
import './Contacts.css';

export default function Contacts() {
  const [selectedContact, setSelectedContact] = useState(null);

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
        <ContactList onSelectContact={setSelectedContact} />
        {selectedContact && <ContactDetails {...selectedContact} />}
      </div>
    </div>
  )
}
