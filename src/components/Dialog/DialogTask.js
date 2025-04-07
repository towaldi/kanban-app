import React, { useState, useEffect } from 'react';
// Firebase
import { db } from '../../firebase';
import { collection, addDoc, getDocs, doc, updateDoc } from 'firebase/firestore';
// Components
import Input from '../Input/Input';
import Textarea from '../Textarea/Textarea';
import Select from '../Select/Select';
import Button from '../Button/Button';
import IconButton from '../IconButton/IconButton';
// Icons
import { Trash } from 'lucide-react';
// Style
import './Dialog.css';

export default function DialogTask({ onClose, existingTask }) {
    // Initialiez task state
    const [task, setTask] = useState({
        title: '',
        description: '',
        assignedTo: '',
        dueDate: '',
        priority: '',
        category: '',
        subtasks: [],
        status: 'To Do'
    });

    // State for validation errors
    const [errors, setErrors] = useState({});

    // State for contacts
    const [contacts, setContacts] = useState([]);

    // If editing, pre-fill the inputs
    useEffect(() => {
        if (existingTask) {
          setTask(existingTask);
        } else {
          // Reset the form when creating a new task
          setTask({
            title: '',
            description: '',
            assignedTo: '',
            dueDate: '',
            priority: '',
            category: '',
            subtasks: [],
            status: 'To Do'
          });
        }
    }, [existingTask]);

    // Fetch contacts from Firestore
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'contacts'));
                const contactsArray = querySnapshot.docs.map(doc => ({
                  id: doc.id,
                  ...doc.data()
                }));
                setContacts(contactsArray);
              } catch (error) {
                console.error('Error fetching contacts:', error);
              }
        };
        
        fetchContacts();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
        // Clear error when user types
        setErrors({ ...errors, [e.target.name]: '' });
    };

    // Handle adding subtasks
    const [subtaskInput, setSubtaskInput] = useState("");

    const handleAddSubtask = () => {
        if (subtaskInput.trim() !== "") {
            setTask((prevTask) => ({
                ...prevTask,
                subtasks: [...prevTask.subtasks, subtaskInput] // Add to array
            }));
            setSubtaskInput(""); // Clear input after adding
        }
    };

    

    // Handle removing subtasks
    const handleRemoveSubtask = (index) => {
        setTask((prevTask) => ({
            ...prevTask,
            subtasks: prevTask.subtasks.filter((_, i) => i !== index) // Remove subtask
        }));
    };

    // Validate inputs
    const validateInputs = () => {
        const newErrors = {};

        if (!task.title.trim()) newErrors.title = "Title is required";
        if (!task.assignedTo) newErrors.assignedTo = "Assigned To is required";
        if (!task.dueDate) newErrors.dueDate = "Due Date is required";
        if (!task.category) newErrors.category = "Category is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    // Submit form and add task to Firebase
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validateInputs()) {
            return;
        }
    
        try {
            if (existingTask) {
                // UPDATE EXISTING TASK
                const taskRef = doc(db, 'tasks', existingTask.id);
                await updateDoc(taskRef, { ...task });
            } else {
                // CREATE NEW TASK
                await addDoc(collection(db, 'tasks'), {
                    ...task,
                    assignedTo: contacts.find(contact => contact.name === task.assignedTo)?.name || "",
                    subtasks: Array.isArray(task.subtasks) ? task.subtasks : []
                });
            }
    
            onClose(); // Close dialog after submission
        } catch (error) {
            console.error("Error saving task:", error);
        }
    };

    return (
        <div className='dialog-bgr'>
            <form className='dialog' onSubmit={handleSubmit}>
                <div className='dialog-input'>
                    <Input
                        type="text"
                        label="Title"
                        name="title"
                        placeholder="Enter a title"
                        value={task.title}
                        onChange={handleChange}
                        required
                        error={errors.title}
                    />
                    <Textarea 
                        label="Description"
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                    />
                    <Select
                        label="Assigned to"
                        name="assignedTo"
                        value={task.assignedTo}
                        onChange={handleChange}
                        options={contacts.map(contact => contact.name)}
                        required
                        error={errors.assignedTo}
                    />
                    <Input
                        type="date"
                        label="Due Date"
                        name="dueDate"
                        value={task.dueDate}
                        onChange={handleChange}
                        required
                        error={errors.dueDate}
                    />
                    <Select
                        label="Priority"
                        name="priority"
                        value={task.priority}
                        onChange={handleChange}
                        options={["High", "Medium", "Low"]}
                    />
                    <Select
                        label="Category"
                        name="category"
                        value={task.category}
                        onChange={handleChange}
                        options={["Technical Task", "User Story", "Prototyping", "Wireframes"]}
                        required
                        error={errors.category}
                    />
                    <div className='row-bottom'>
                        <Input
                            type="text"
                            label="Subtasks"
                            name="subtasks"
                            placeholder="Add new subtask"
                            value={subtaskInput}
                            onChange={(e) => setSubtaskInput(e.target.value)}
                        />
                        <Button
                            style="btn-secondary"
                            type="button"
                            label="Add"
                            onClick={handleAddSubtask}
                        />
                    </div>
                    <ul>
                        {task.subtasks.map((subtask, index) => (
                            <li key={index} className="subtask-item">
                                {subtask}
                                <IconButton 
                                    icon={Trash}
                                    onClick={() => handleRemoveSubtask(index)}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='row-right'>
                    <Button
                        style='btn-secondary'
                        type='button'
                        label='Cancel'
                        onClick={onClose}
                    />
                    <Button
                        style='btn-primary'
                        type='submit'
                        label={existingTask ? 'Update Task' : 'Add Task'}
                    />
                </div>
            </form>
        </div>
    )
}
