import React, { useState, useEffect } from 'react';
// Components
import Input from '../Input/Input';
import Button from '../Button/Button';
// Style
import './Dialog.css';

export default function DialogContact({ onClose, onSave, contactToEdit }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    // Set default values when editing
    useEffect(() => {
        if (contactToEdit) {
            setName(contactToEdit.name);
            setEmail(contactToEdit.email);
            setPhone(contactToEdit.phone);
        }
    }, [contactToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) return;
    
        const updatedContact = {
            id: contactToEdit?.id, // Include ID when editing
            name, 
            email, 
            phone 
        };
    
        // Send data to Contacts.js, where Firestore update happens
        onSave(updatedContact);
        onClose(); // Close dialog after saving
    };

    return (
        <div className='dialog-bgr'>
            <form className='dialog' onSubmit={handleSubmit}>
                <h1>{contactToEdit ? 'Edit Contact' : 'Add Contact'}</h1>
                <div className='dialog-input'>
                    <Input 
                        label='Name'
                        placeholder='Enter Name'
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input 
                        label='Email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input 
                        label='Phone'
                        placeholder='Enter Phone Number'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className='row-right'>
                    <Button 
                        style='btn-secondary'
                        type='button'
                        label='Cancel'
                        onClick={onClose}
                    />
                    <Button 
                        style='btn-primary'
                        type='submit'
                        label={contactToEdit ? 'Save Changes' : 'Add Contact'}
                    />
                </div>
         </form>
        </div>
    )
}
