import React, { useState } from 'react';
// Components
import Input from '../Input/Input';
import Button from '../Button/Button';
// Style
import './Dialog.css';

export default function DialogContact({ onClose, onAdd }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) return;

        const newContact = { name, email, phone };
        onAdd(newContact);  // Send data to firestore
    }
  return (
    <div className='dialog-bgr'>
        <form className='dialog' onSubmit={handleSubmit}>
            <h1>Add Contact</h1>
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
                    label='Add'
                />
            </div>
        </form>
    </div>
  )
}
