import React from 'react';
// Sytle
import './Task.css';

export default function Task({ title, description, priority, assigned }) {
    return (
        <div className='task'>
            <h2>{title}</h2>
            <p>{description}</p>
            <p>{priority}</p>
            <p>{assigned}</p>
        </div>
    )
}
