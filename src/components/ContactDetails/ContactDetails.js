import React from 'react';
// Components
import Avatar from '../Avatar/Avatar';
import Button from '../Button/Button';
// Style
import './ContactDetails.css';

export default function ContactDetails({ name, email, phone, onDelete }) {
    return (
        <div className='contact-details'>
            <div className='contact-header'>
                <Avatar />
                <h1>{name}</h1>
            </div>
            <p>{email}</p>
            <p>{phone}</p>
            <div className='contact-actions'>
                <Button 
                    style='btn-secondary'
                    label='Edit Contact'
                />
                <Button 
                    style='btn-secondary'
                    label='Delete Contact'
                    onClick={onDelete}
                />
            </div>
        </div>
    )
}
