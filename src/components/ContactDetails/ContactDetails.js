import React from 'react';
// Components
import AvatarContact from '../Avatar/AvatarContact';
import Button from '../Button/Button';
// Style
import './ContactDetails.css';

export default function ContactDetails({ name, email, phone, onDelete, onEdit }) {
    return (
        <div className='contact-details'>
            <div className='contact-content'>
                <div className='contact-img'></div>
                <div className='contact-header'>
                    <AvatarContact name={name} />
                    <h1>{name}</h1>
                </div>
                <div className='contact-infos'>
                    <p>{email}</p>
                    <p>{phone}</p>
                </div>
            </div>
            <div className='contact-actions'>
                <Button 
                    style='btn-secondary'
                    label='Edit Contact'
                    onClick={onEdit}
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
