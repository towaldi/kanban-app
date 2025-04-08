import React, { useState, useEffect } from 'react';
// Firebase
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
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
  const [contactToEdit, setContactToEdit] = useState(null);
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
  }, []);

  // Add contact to firestore
  const addContactToFirestore = async (contact) => {
    try {
        const docRef = await addDoc(collection(db, 'contacts'), {
            name: contact.name,
            email: contact.email,
            phone: contact.phone
        }); // Do not include `id` in Firestore

        setContacts([...contacts, { id: docRef.id, ...contact }]); // Add the `id` manually after Firestore returns it
    } catch (error) {
        console.error('Error adding contact:', error);
    }
};

  // Edit contact (opens dialog with selected contact)
  const openEditDialog = (contact) => {
    setContactToEdit(contact);
    setIsDialogOpen(true);
  };

  // Save edited contact in Firestore
  const updateContactInFirestore = async (updatedContact) => {
    if (!updatedContact.id) {
      console.error("Error: Contact ID is missing, cannot update.");
      return; // Prevent updating without an ID
    }

    try {
      const contactRef = doc(db, 'contacts', updatedContact.id);
      await updateDoc(contactRef, updatedContact);
      
      // Update local UI state
      setContacts(prevContacts =>
        prevContacts.map(contact =>
          contact.id === updatedContact.id ? { ...contact, ...updatedContact } : contact
        )
      );
      // Update displayed contact
      setSelectedContact(prev =>
        prev && prev.id === updatedContact.id ? { ...prev, ...updatedContact } : prev
      );
    } catch (error) {
      console.error('Error updating contact:', error);
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
          onClick={() => {
            setIsDialogOpen(true);
            setContactToEdit(null);
          }}
        />
      </div>
      <div className='row-gap-1'>
        <ContactList 
          onSelectContact={setSelectedContact} 
          contacts={contacts}
        />
        <ContactDetails 
          name={selectedContact?.name || ''}
          email={selectedContact?.email || ''}
          phone={selectedContact?.phone || ''}
          onDelete={selectedContact ? () => deleteContactFromFirestore(selectedContact.id) : null}
          onEdit={selectedContact ? () => openEditDialog(selectedContact) : null}
        />
        {isDialogOpen && (
          <DialogContact 
            onClose={() => setIsDialogOpen(false)} 
            onSave={(contact) => {
              if (contactToEdit) {
                  updateContactInFirestore(contact); // Firestore update + UI update
              } else {
                  addContactToFirestore(contact);
              }
              setIsDialogOpen(false); // Close dialog after save
            }}
            contactToEdit={contactToEdit}
          />
        )}
      </div>
    </div>
  )
}
