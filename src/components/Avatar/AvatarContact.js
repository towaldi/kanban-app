import React from 'react';
// Style
import './Avatar.css';

export default function AvatarContact({ name }) {
    // Extract the first two letters of the name
    const getInitials = (name) => {
        if (!name) return "??"; // Handle empty name
        
        const words = name.trim().split(/\s+/); // Split by space (handle multiple spaces)
        if (words.length === 1) {
            return words[0][0].toUpperCase(); // Return first letter if only one word
        }
        return (words[0][0] + words[1][0]).toUpperCase(); // Take initials from first two words
    };

    return (
        <div className='avatar-contact'>
            <p>{getInitials(name)}</p>
        </div>
    );
}
