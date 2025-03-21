import React, { useEffect, useState } from 'react';
// Firebase
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
// Components
import Chip from '../Chip/Chip';
import IconButton from '../IconButton/IconButton';
import AvatarContact from '../Avatar/AvatarContact';
// Icons
import { Trash, ChevronDown, ChevronUp, Minus } from 'lucide-react';
// Style
import './Task.css';

export default function Task({ task, provided, snapshot, onDelete, onSelect, isSelected }) {
    const [assignedContact, setAssignedContact] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("Task assignedTo:", task.assignedTo); // Log assigned ID

        if (!task.assignedTo) {
            console.log("No assignedTo, skipping fetch.");
            setAssignedContact(null);
            return;
        }

        const fetchContact = async () => {
            setLoading(true);
            console.log("Fetching contact for ID:", task.assignedTo);
            
            try {
                const contactRef = doc(db, 'contacts', task.assignedTo);
                const contactSnap = await getDoc(contactRef);
                
                if (contactSnap.exists()) {
                    console.log("Contact found:", contactSnap.data());
                    setAssignedContact(contactSnap.data());
                } else {
                    console.log("No contact found for ID:", task.assignedTo);
                    setAssignedContact(null);
                }
            } catch (error) {
                console.error("Error fetching assigned contact:", error);
                setAssignedContact(null);
            } finally {
                setLoading(false);
            }
        };

        fetchContact();
    }, [task.assignedTo]);

    const getPriorityIcon = (priority) => {
        switch (priority) {
            case "High": return <ChevronUp className="priority-icon high" size={20} />;
            case "Medium": return <Minus className="priority-icon medium" size={20} />;
            case "Low": return <ChevronDown className="priority-icon low" size={20} />;
            default: return null;
        }
    };

    return (
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
                    loading ? (
                        <p>Loading...</p>
                    ) : assignedContact ? (
                        <AvatarContact name={assignedContact.name} />
                    ) : (
                        <p>No assignee (contact not found)</p> // Differentiate missing contact
                    )
                ) : (
                    <p>No assignee</p>
                )}
            </div>
        </div>
    );
}
