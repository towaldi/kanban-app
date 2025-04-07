import React from 'react';
// Components
import Chip from '../Chip/Chip';
import IconButton from '../IconButton/IconButton';
import AvatarContact from '../Avatar/AvatarContact';
// Icons
import { Trash, ChevronDown, ChevronUp, Minus } from 'lucide-react';
// Style
import './Task.css';

export default function Task({ task, provided, snapshot, onDelete, onSelect, isSelected }) {


    const getPriorityIcon = (priority) => {
        switch (priority) {
            case "High": return <ChevronUp className="priority-icon high" size={20} />;
            case "Medium": return <Minus className="priority-icon medium" size={20} />;
            case "Low": return <ChevronDown className="priority-icon low" size={20} />;
            default: return null;
        }
    };

    return (
        <>
        <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={onSelect}
            className={`task ${snapshot.isDragging ? 'dragging' : ''} ${isSelected ? 'active' : ''}`}
        >
            <div className='task-header'>
                <h3>{task.title}</h3>
                <IconButton
                    icon={Trash}
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(task.id);
                    }}
                />
            </div>
            {task.category && <Chip label={task.category} />}
            <p>{task.description}</p>
            <p>Due: {task.dueDate}</p>
            
            <div className='task-row'>
                <p>{getPriorityIcon(task.priority)}</p>
                {task.assignedTo ? (
                    <AvatarContact name={task.assignedTo} />
                ) : (
                    <p>No assignee</p>
                )}
            </div>
        </div>
    </>
    );
}
