import React from 'react';
import { Trash } from 'lucide-react';
// Sytle
import './Task.css';
import IconButton from '../IconButton/IconButton';

export default function Task({ task, provided, snapshot, onDelete }) {
    return (
        <div 
            ref={provided.innerRef} 
            {...provided.draggableProps} 
            {...provided.dragHandleProps}
            // Add class while dragging
            className={`task ${snapshot.isDragging ? 'dragging' : ''}`}
        >
            <div className='task-header'>
                <h3>{task.title}</h3>
                <IconButton
                    icon={Trash}
                    onClick={() => onDelete(task.id)}
                />
            </div>
            <p>Category: {task.category}</p>
            <p>{task.description}</p>
            <p>Due: {task.dueDate}</p>
            <div className='task-row'>
                <p>Priority: {task.priority}</p>
                <p>Assigned to: {task.assignedTo}</p>
            </div>
        </div>
    )
}
