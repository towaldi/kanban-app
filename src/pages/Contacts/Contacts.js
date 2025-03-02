import React, { useState, useEffect } from 'react';
// Firebase
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
// Components
import Button from '../../components/Button/Button';
import ContactList from '../../components/ContactList/ContactList';
import ContactDetails from '../../components/ContactDetails/ContactDetails';
import DialogContact from '../../components/Dialog/DialogContact';
//Style
import './Contacts.css';

export default function Contacts() {
  const [selectedContact, setSelectedContact] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'contacts'));
        const contactsArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setContacts(contactsArray);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []); // Runs once on mount

  // Add contact to firestore
  const addContactToFirestore = async (contact) => {
    try {
      const docRef = await addDoc(collection(db, 'contacts'), contact);
      setContacts([...contacts, { id: docRef.id, ...contact }]); // Update local state with Firestore ID
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  // Delete contact on firestore
  const deleteContactFromFirestore = async (contactId) => {
    try {
      await deleteDoc(doc(db, 'contacts', contactId));
      setContacts(contacts.filter(contact => contact.id !== contactId)); // Update UI
      setSelectedContact(null); // Deselect the deleted contact
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <div className='workspace'>
      <div className='workspace-header'>
        <h1>Contacts</h1>
        <Button 
          style="btn-primary" 
          label="Add Contact"
          onClick={() => setIsDialogOpen(true)}
        />
      </div>
      <div className='row-gap-1'>
        <ContactList onSelectContact={setSelectedContact} contacts={contacts} />
          {selectedContact && 
            <ContactDetails 
              {...selectedContact}
              onDelete={() => deleteContactFromFirestore(selectedContact.id)}
            />
          }
          {isDialogOpen && (
            <DialogContact 
              onClose={() => setIsDialogOpen(false)} 
              onAdd={(contact) => {
                addContactToFirestore(contact); // Add to Firestore
                setIsDialogOpen(false); // Close dialog
              }}
            />
          )}
      </div>
    </div>
  )
}
