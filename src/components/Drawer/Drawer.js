import React from 'react';
// Firebase
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';

// Components
import IconButton from '../IconButton/IconButton';
import Chip from '../Chip/Chip';
import Button from '../Button/Button';
// Icons
import { X, ChevronDown, ChevronUp, Minus } from 'lucide-react';
// Style
import './Drawer.css';

export default function Drawer({ task, onClose, onDelete, onEdit }) {
  if (!task) return null; // Prevent rendering if no task is selected

  // Function to return priority icon
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "High":
        return (
            <span className="drawer-status">
                <ChevronUp className="priority-icon high" size={20}/>
                <span className="priority-text">High Priority</span>
            </span>
        );
      case "Medium":
        return (
            <span className="drawer-status">
                <Minus className="priority-icon medium" size={20}/>
                <span className="priority-text">Medium Priority</span>
            </span>
        );
      case "Low":
        return (
            <span className="drawer-status">
                <ChevronDown className="priority-icon low" size={20}/>
                <span className="priority-text">Low Priority</span>
            </span>
        );
      default:
        return null;
    }
  };

  // Function to handle task deletion
  const handleDelete = async () => {
    if (!task.id) return;
    try {
      await deleteDoc(doc(db, 'tasks', task.id)); // Delete from Firestore
      if (onDelete) {
        onDelete(task.id); // Remove from UI
      }
      onClose(); // Close the drawer
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className='drawer'>
      <div className='drawer-content'>
        <div className='drawer-header'>
          <h3>{task.title}</h3>
          <IconButton
            icon={X}
            onClick={onClose}
          />
        </div>

        {task.category && <Chip label={task.category}/>}

        <div className='drawer-details'>
          <div className='drawer-attribute'>
            <label>Description</label>
            <p>{task.description}</p>
          </div>
          <div className='drawer-attribute'>
            <label>Due</label>
            <p>{task.dueDate}</p>
          </div>
          <div className='drawer-attribute'>
            <label>Priority</label>
            <p>{getPriorityIcon(task.priority)}</p>
          </div>
          <div className='drawer-attribute'>
            <label>Status</label>
            <p>{task.status}</p>
          </div>
          <div className='drawer-attribute'>
            <label>Assigned to:</label>
            <p>{task.assignedTo}</p>
          </div>
          <div className='drawer-attribute'>
            <label>Subtasks:</label>
            {Array.isArray(task.subtasks) && task.subtasks.length > 0 ? (
              <ul className="subtask-list">
                {task.subtasks.map((subtask, index) => (
                  <li key={index} className="subtask-item">
                    {subtask}
                </li>
                ))}
              </ul>
            ) : (
              <p>No subtasks</p>
            )}
          </div>
        </div>
      </div>

      <div className='drawer-actions'>
        <Button 
          style='btn-secondary'
          label='Edit Task'
          onClick={() => onEdit(task)}
        />
        <Button 
          style='btn-secondary'
          label='Delete Task'
          onClick={handleDelete}
        />
      </div>
    </div>
  )
}
