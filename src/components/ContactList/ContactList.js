import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
// Components
import ContactListItem from '../ContactListItem/ContactListItem';
// Style
import './ContactList.css';

export default function ContactList({ onSelectContact }) {
    const [groupedContacts, setGroupedContacts] = useState({});

    useEffect(() => {
        const fetchContacts = async () => {
          try {
            const contactsSnapshot = await getDocs(collection(db, 'contacts'));
            const contactsData = contactsSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));

            // Step 1: Sort contacts alphabetically
            contactsData.sort((a, b) => a.name.localeCompare(b.name));

            // Step 2: Group contacts by first letter
            const grouped = contactsData.reduce((acc, contact) => {
                const firstLetter = contact.name[0].toUpperCase(); // Extract first letter
                if (!acc[firstLetter]) {
                    acc[firstLetter] = []; // Create array if it doesn't exist
                }
                acc[firstLetter].push(contact);
                return acc;
            }, {});

            setGroupedContacts(grouped);
          } catch (error) {
            console.error("Error fetching contacts:", error);
          }
        };

        fetchContacts();
    }, []);

    return (
        <ul className='contact-list'>
            {Object.keys(groupedContacts).length === 0 ? (
                <p>No contacts found.</p>
            ) : (
                Object.keys(groupedContacts).sort().map(letter => (
                    <div key={letter}>
                        <div className='sorting-header'>
                            <h2>{letter}</h2>
                        </div>
                        {groupedContacts[letter].map(contact => (
                            <ContactListItem 
                                key={contact.id} 
                                contact={contact}
                                onSelect={onSelectContact}
                            />
                        ))}
                    </div>
                ))
            )}
        </ul>
    );
}
