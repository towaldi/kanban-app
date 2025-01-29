import React from 'react';
// Components
import Task from '../Task/Task';
// Style
import './Column.css';

export default function Column({ title, tasks }) {
    return (
        <div className='column'>
            <h2>{title}</h2>
            <div className='column-bgr'>
                {tasks.map((task) => (
                    <Task 
                        key={task.id} 
                        title={task.title}
                        description={task.description}
                        priority={task.priority}
                        assigned={task.assigned}
                    />
                ))}
            </div>
        </div>
    )
}
