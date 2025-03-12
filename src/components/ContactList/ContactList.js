import React, { useEffect, useState } from 'react';
// Components
import ContactListItem from '../ContactListItem/ContactListItem';
// Style
import './ContactList.css';

export default function ContactList({ onSelectContact, contacts }) {
    const [groupedContacts, setGroupedContacts] = useState({});
    const [selectedContact, setSelectedContact] = useState(null); // Track selected contact

    useEffect(() => {
        const groupContacts = (contacts) => {
            // Step 1: Sort contacts alphabetically
            const sorted = contacts.sort((a, b) => a.name.localeCompare(b.name));
            // Step 2: Group contacts by first letter
            return sorted.reduce((acc, contact) => {
                const firstLetter = contact.name[0].toUpperCase();  // Extract first letter
                if (!acc[firstLetter]) acc[firstLetter] = [];   // Create array if it doesn't exist
                acc[firstLetter].push(contact);
                return acc;
            }, {});
        };

        setGroupedContacts(groupContacts(contacts));
    }, [contacts]);

    const handleSelectContact = (contact) => {
        setSelectedContact(contact); // Set the selected contact
        onSelectContact(contact); // Notify the parent component
    };

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
                                isSelected={selectedContact?.id === contact.id} // Check if selected
                                onSelect={handleSelectContact}  // pass selection handler
                            />
                        ))}
                    </div>
                ))
            )}
        </ul>
    );
}
