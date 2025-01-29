import React from 'react';
// Sytle
import './Task.css';

export default function Task({ title }) {
    return (
        <div className='task'>
            {title}
        </div>
    )
}
