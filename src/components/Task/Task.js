import React from 'react';
// Compoments
import Chip from '../Chip/Chip';
import IconButton from '../IconButton/IconButton';
// Icons
import { Trash, ChevronDown, ChevronUp, Minus } from 'lucide-react';
// Sytle
import './Task.css';

export default function Task({ task, provided, snapshot, onDelete }) {
    // Function to return priority icon
    const getPriorityIcon = (priority) => {
        switch (priority) {
            case "High":
                return <ChevronUp className="priority-icon high" size={20}/>;
            case "Medium":
                return <Minus className="priority-icon medium" size={20}/>;
            case "Low":
                return <ChevronDown className="priority-icon low" size={20}/>;
            default:
                break;
        }
    }

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
            {task.category && <Chip label={task.category}/>}
            <p>{task.description}</p>
            <p>Due: {task.dueDate}</p>
            <div className='task-row'>
                <p>{getPriorityIcon(task.priority)}</p>
                <p>Assigned to: {task.assignedTo}</p>
            </div>
        </div>
    )
}
