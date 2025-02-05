import React from 'react';
// Style
import './Chip.css';

export default function Chip({ label }) {
    const categoryColors = {
        'Technical Task': 'chip-blue',
        'User Story': 'chip-green',
        'Prototyping': 'chip-rose',
        'Wireframes': 'chip-orange'
    };

    return (
        <div className={`chip ${categoryColors[label] || ''}`}>
            {label}
        </div>
    )
}
