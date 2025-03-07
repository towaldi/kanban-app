import React from 'react';
// Style
import './Avatar.css';

export default function AvatarContact({ name }) {
    // Extract the first two letetrs of the name
    const getInitials = (name) => {
        if (!name) return "??";
        const words = name.split('');
        // Take first letter of first & second word
        return (words[0][0] + (words[1]?.[0] || "")).toUpperCase();
    }

    return (
        <div className='avatar-contact'>
            <p>{getInitials(name)}</p>
        </div>
    )
}
